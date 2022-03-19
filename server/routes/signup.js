const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//return signup page
router.get('/', (req, res) => {
    return res.send('signup');
});

router.post('/', userController.createUser, (req, res) => {
    return res.send('signup successful');
    //redirect to login
});

module.exports = router;