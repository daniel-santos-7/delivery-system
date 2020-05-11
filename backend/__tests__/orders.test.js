const app = require('../src/app');
const request = require('supertest');
const factory = require('./factory');
const { Order } = require('../src/models');

describe('orders tests',()=> {

    afterEach(async ()=> {

        await factory.cleanUp();

    });

    test('should return a list of orders', async ()=> {

        const count = 9;

        const perPage = 8;

        await factory.createMany('Order',count);

        const indexResponse = await request(app).get('/order');

        expect(indexResponse.status).toBe(200);

        expect(indexResponse.body.length).toBe(perPage);
        
        expect(Number(indexResponse.header['x-total-count'])).toBe(count);

    });

    test('should store a new product in the database', async ()=> {

        const products = await factory.createMany('Product',3);

        const newOrder = await factory.attrs('Order',{ 
            quantities: products.map((product,index)=> ({
                product_id: product.id,
                quantity: index+1
            }))
        });

        const storageResponse = await request(app).post('/order').send(newOrder);
        
        expect(storageResponse.status).toBe(201);
        
        const storedOrder = await Order.findByPk(storageResponse.body.id, { include:'quantities' });

        expect(storedOrder).not.toBeNull();

        expect(storedOrder.quantities.length).toEqual(products.length);

    });

    test('should deny requisition when unavailable products are ordered', async ()=> {

        const unavailableProductId = 999;

        const newOrder = await factory.attrs('Order', {
            quantities: [
                {
                    product_id: factory.assoc('Product','id'),
                    quantity:1
                },
                {
                    product_id: unavailableProductId,
                    quantity:1
                }
            ]
        });

        const storageResponse = await request(app).post('/order').send(newOrder);

        expect(storageResponse.status).toBe(404);

        expect(storageResponse.body.unavailable).toEqual([unavailableProductId]);

    });

    test('should update the status of a stored order', async ()=> {

        const updates = {
            status:'in progress'
        }

        const order = await factory.create('Order');
        
        const updateResponse = await request(app).put(`/order/${order.id}`).send(updates);
        
        expect(updateResponse.status).toBe(200);
        
        await order.reload();

        expect(order.dataValues).toEqual(expect.objectContaining(updates));

    });

    test('should select a stored order', async ()=> {

        const order = await factory.create('Order', { 
            quantities: [{
                product_id: factory.assoc('Product','id'),
                quantity: 1
            }]
        });
       
        const selectionResponse = await request(app).get(`/order/${order.id}`);
       
        expect(selectionResponse.status).toBe(200);
       
        expect(selectionResponse.body).toEqual(expect.objectContaining({
            ...order.dataValues,
            createdAt:expect.any(String),
            updatedAt:expect.any(String)
        }));

    });

    test('should delete a stored order', async ()=> {

        const order = await factory.create('Order');
        
        const deleteResponse = await request(app).delete(`/order/${order.id}`);
        
        expect(deleteResponse.status).toBe(204);
        
        expect(await Order.findByPk(order.id)).toBeNull();

    });

});