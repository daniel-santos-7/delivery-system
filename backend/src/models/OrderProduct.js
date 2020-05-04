module.exports = (sequelize, DataTypes)=> {

    const OrderProduct = sequelize.define('OrderProduct', {
        quantity: DataTypes.INTEGER
    },{
        timestamps:false
    });

    OrderProduct.associate = (models)=> {

        const { Order } = models;

        OrderProduct.belongsTo(Order);

    }

    return OrderProduct;

};