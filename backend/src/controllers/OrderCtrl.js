const { Op } = require('sequelize');
const { Order, Product } = require('../models');
const Controller = require('./Controller');

class OrderCtrl extends Controller {

    constructor(model) {
        super(model);
        this.select = this.select.bind(this);
        this.update = this.update.bind(this);
    }

    async store(req,res) {

        try {

            const { client, tel, details, location, quantities } = req.body;

            const orderedProductIds = quantities.map(({product_id})=> product_id);

            const availableProducts = await Product.findAll({
                attributes:['id'],
                where: {
                    id: { 
                        [Op.in]: orderedProductIds
                    }
                } 
            });

            const availableProductsIds = availableProducts.map((product)=> product.id);

            if(orderedProductIds.length!==availableProductsIds.length) {

                const unavailableProductsIds = orderedProductIds.filter((orderedProductId)=> 
                    !availableProductsIds.includes(orderedProductId)
                );

                return res.status(404).json({
                    message: 'some products are not available',
                    unavailable: unavailableProductsIds
                });

            }

            const order = await Order.create({ 
                client,
                tel,
                details,
                location,
                quantities
             }, {
                 include:'quantities'
             });

            req.app.locals.io.emit('new order', { id:order.id });

            return res.status(201).json({id:order.id});

        } catch(err) {

            return res.status(500).json({ message: 'there was a problem with the server' });

        }

    }

    async select(req,res) {

        try {

            const orderId = req.params.id;

            const order = await this.model.findByPk(orderId, { include:'quantities' });

            if(!order) {

                return res.status(404).json({ message:'order not found' });
            
            }

            return res.json(order);

        } catch(err) {

            return res.status(500).json({ message: 'there was a problem with the server' });

        }        

    }

    async update(req,res) {

        try {

            const orderId = req.params.id;

            const {status} = req.body;

            const order = await this.model.findByPk(orderId);

            if(!order) {

                return res.status(404).json({ message:'order not found' });
            
            }

            await order.update({status});

            req.app.locals.io.emit('order updated', { id:order.id });

            return res.send();

        } catch(err) {

            return res.status(500).json({ message: 'there was a problem with the server' });

        }        

    }

}

module.exports = new OrderCtrl(Order);