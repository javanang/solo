const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getUserProduct, (req, res) => {
    return res.status(200).json(res.locals.userProducts);
});

router.put('/available', productController.updateAvail, (req, res) => {
    return res.status(200).json(res.locals.success);
});

router.delete('/deleteProduct', productController.deleteProduct, (req, res) => {
    return res.status(200).json(res.locals.success);
});

router.post('/create', productController.createProduct, (req, res) => {
    return res.status(200).json(res.locals.success);
});

module.exports = router;