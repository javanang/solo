const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/', userController.createUser, (req, res) => {
    return res.send('signup successful');
    //redirect to login
});

module.exports = router;