const { Op } = require('sequelize');
const { Order, Product } = require('../models');

class OrderCtrl {

    constructor(model) {
        this.model = model;
        this.index = this.index.bind(this);
        this.select = this.select.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    async index(req,res) {

        try {

            const { page=1 } = req.query;

            const limit = 8;

            const offset = (page-1)*limit;

            const order = [['createdAt','DESC']];

            const include = {
                association: 'products',
                attributes:['name'],
                through: {
                    as: 'quantities',
                    attributes: ['quantity'] 
                } 
            };

            const docs = await this.model.findAndCountAll({limit,offset,order,include});

            const count = docs.count;

            res.header('X-Total-Count',count);

            if(count===0) {
                return res.status(204).json({ message:'no registered documents' });
            }

            return res.json(docs.rows);

        } catch(err) {

            return res.status(500).json({ message: 'there was a problem with the server' });

        }

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
            
            const include = {
                association: 'products',
                attributes:['name'],
                through: {
                    as: 'quantities',
                    attributes: ['quantity'] 
                } 
            };

            const order = await this.model.findByPk(orderId, { include });

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

module.exports = new OrderCtrl(Order);