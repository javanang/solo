const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getUserProduct, (req, res) => {
    return res.send(res.locals.userProducts);
});

router.post('/create', productController.createProduct, (req, res) => {
    return res.send('created product');
});

module.exports = router;