const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController')

router.post('/', userController.verifyUser, userController.loggedIn, cookieController.setSSIDCookie, (req, res) => {
    return res.status(200).json(res.locals.userInfo);
});

router.put('/out', userController.loggedOut, (req, res) => {
    return res.status(200);
});

router.get('/check', userController.getUser, (req, res) => {
    console.log(req.cookies.ssid);
    return res.status(200).json(res.locals.userInfo);
});

module.exports = router;