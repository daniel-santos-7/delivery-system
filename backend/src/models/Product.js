
module.exports = (sequelize, DataTypes)=> {
    
    const Product = sequelize.define('Product', {
        name: DataTypes.STRING,
        image_url: DataTypes.STRING,
        description: DataTypes.TEXT,
        price: DataTypes.DOUBLE
    });

    Product.associate = (models)=> {

        const { Order, OrderProduct } = models;

        Product.belongsToMany(Order, {
            foreignKey:'product_id',
            through: OrderProduct,
            as:'orders'
        });

    };

    return Product;

}