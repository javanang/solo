const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController')

router.get('/', (req, res) => {
    return res.send('login');
});

//verify username and password
//set SSID cookie
//start session
router.post('/', userController.verifyUser, cookieController.setSSIDCookie, (req, res) => {
    return res.send('login successful'); //redirect
});

module.exports = router;