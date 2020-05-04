
module.exports = (sequelize, DataTypes)=> {
    
    const Order = sequelize.define('Order', {
        client:DataTypes.STRING,
        tel: DataTypes.STRING,
        details:DataTypes.TEXT,
        location: DataTypes.STRING,
        status: DataTypes.ENUM('in progress', 'delivered', 'on hold','canceled'),
    });

    Order.associate = (models)=> {

        const { Product, OrderProduct } = models;

        Order.belongsToMany(Product, {
            foreingnKey: 'order_id',
            through: OrderProduct,
            as: 'products'
        });
        
        Order.hasMany(OrderProduct, { as:'quantities' });
 
    };

    return Order;

}