const express = require('express');
const router = express.Router();
const ProductCtrl = require('./controllers/ProductCtrl');
const OrderCtrl = require('./controllers/OrderCtrl');

router.get('/product',ProductCtrl.index);
router.post('/product',ProductCtrl.store);
router.get('/product/:id',ProductCtrl.select);
router.put('/product/:id',ProductCtrl.update);
router.delete('/product/:id',ProductCtrl.delete);

router.get('/order',OrderCtrl.index);
router.post('/order',OrderCtrl.store);
router.get('/order/:id',OrderCtrl.select);
router.put('/order/:id',OrderCtrl.update);
router.delete('/order/:id',OrderCtrl.delete);

module.exports = router;