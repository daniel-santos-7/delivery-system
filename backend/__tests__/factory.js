const { factory } = require('factory-girl');
const { Product,Order } = require('../src/models');

factory.define('Product',Product,{
    name:'X-Tudo',
    image_url:'http://lorempixel.com/640/480/food/',
    description: 'Lanche delicioso',
    price: 15
});

factory.define('Order',Order,{
    client:'danielsantos@gmail.com',
    tel:'99999-9999',
    details:'sem tomates',
    location: 'rua do exemplo',
    status: 'on hold'
},{include:'quantities'});

module.exports = factory;