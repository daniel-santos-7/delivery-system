const app = require('../src/app');
const request = require('supertest');
const { Product } = require('../src/models');
const factory = require('./factory');

describe('products tests',()=> {

    afterEach(async ()=> {

        await factory.cleanUp();
    
    });

    test('should return a list of products', async ()=> {

        const count = 11;

        const perPage = 10;
        
        await factory.createMany('Product',count);

        const indexResponse = await request(app).get('/product');

        expect(indexResponse.status).toBe(200);

        expect(indexResponse.body.length).toBe(perPage);
        
        expect(Number(indexResponse.header['x-total-count'])).toBe(count);

    });

    test('should store a new product in the database', async ()=> {

        const newProduct = await factory.attrs('Product');

        const storageResponse = await request(app).post('/product').send(newProduct);

        expect(storageResponse.status).toBe(201);

        expect(storageResponse.body.id).toEqual(expect.any(Number));

        expect(await Product.findByPk(storageResponse.body.id)).not.toBeNull();

    });

    test('should update the attributes of a stored product', async ()=> {

        const updates = {
            name:'Completo',
            description: 'Lanche delicioso :)',
            price: 10
        }

        const product = await factory.create('Product');

        const updateResponse = await request(app).put(`/product/${product.id}`).send(updates);
        
        expect(updateResponse.status).toBe(200);
        
        await product.reload();

        expect(product.dataValues).toEqual(expect.objectContaining(updates));

    });

    test('should delete a product from the database', async ()=> {

        const product = await factory.create('Product');

        const deleteResponse = await request(app).delete(`/product/${product.id}`);
        
        expect(deleteResponse.status).toBe(204);
        
        expect(await Product.findByPk(product.id)).toBeNull();

    });

});