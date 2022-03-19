const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts, (req, res) => {
    return res.send(res.locals.allProducts);
});

module.exports = router;