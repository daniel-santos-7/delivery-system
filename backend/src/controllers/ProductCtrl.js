const { Product } = require('../models');
const Controller = require('./Controller');

class ProductCtrl extends Controller {

    constructor(model) {
        super(model);
        this.store = this.store.bind(this)
    }

    async store(req,res) {

        try {

            const { name, description, price } = req.body;

            const product = await this.model.create({ name, description, price });

            return res.status(201).json({id:product.id});

        } catch(err) {

            return res.status(500).json({ message: 'there was a problem with the server' });

        }

    }

}

module.exports = new ProductCtrl(Product);