const { Product } = require('../models');
const Controller = require('./Controller');

class ProductCtrl extends Controller {

    constructor(model) {
        super(model);
        this.store = this.store.bind(this);
        this.update = this.update.bind(this);
    }

    async store(req,res) {

        try {

            const { name, description, price } = req.body;

            const product = await this.model.create({ name, description, price });

            req.app.locals.io.emit('new product', { id:product.id });

            return res.status(201).json({id:product.id});

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

}

module.exports = new ProductCtrl(Product);