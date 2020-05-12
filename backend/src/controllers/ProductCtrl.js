const { Product } = require('../models');

class ProductCtrl {

    constructor(model) {
        this.model = model;
        this.index = this.index.bind(this)
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
        this.select = this.select.bind(this);
        this.delete = this.delete.bind(this);
    }

    async index(req,res) {

        try {

            const { page=1 } = req.query;

            const limit = 8;

            const offset = (page-1)*limit;

            const order = [['createdAt','DESC']];

            const docs = await this.model.findAndCountAll({limit,offset,order});

            const count = docs.count;

            res.header('X-Total-Count',count);

            if(count===0) {
                return res.status(204).json({ message:'no registered documents' });
            }

            return res.json(docs.rows);

        } catch(err) {
            console.log(err);
            return res.status(500).json({ message: 'there was a problem with the server' });

        }

    }

    async store(req,res) {

        try {

            const { name, image_url, description, price } = req.body;

            const product = await this.model.create({ name, image_url, description, price });

            req.app.locals.io.emit('new product', { id:product.id });

            return res.status(201).json({id:product.id});

        } catch(err) {

            return res.status(500).json({ message: 'there was a problem with the server' });

        }

    }

    async select(req,res) {

        try {

            const productId = req.params.id;

            const product = await this.model.findByPk(productId);

            if(!product) {

                return res.status(404).json({ message:'product not found' });
            
            }

            return res.json(product);

        } catch(err) {

            return res.status(500).json({ message: 'there was a problem with the server' });

        }        

    }

    async update(req,res) {

        try {

            const productId = req.params.id;

            const updates = req.body;

            const product = await this.model.findByPk(productId);

            if(!product) {

                return res.status(404).json({ message:'product not found' });
            
            }

            await product.update(updates);

            req.app.locals.io.emit('product updated', { id:product.id });

            return res.send();

        } catch(err) {

            return res.status(500).json({ message: 'there was a problem with the server' });

        }        

    }

    async delete(req,res) {

        try {

            const docId = req.params.id;

            const doc = await this.model.findByPk(docId);

            if(!doc) {

                return res.status(404).json({ message:'document not found' });
            
            }

            await doc.destroy();

            return res.status(204).send();

        } catch(err) {

            return res.status(500).json({ message: 'there was a problem with the server' });

        }        

    }

}

module.exports = new ProductCtrl(Product);