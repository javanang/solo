const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const cookieController = require('../controllers/cookieController')

router.post('/', userController.verifyUser, cookieController.setSSIDCookie, (req, res) => {
    return res.status(200).json(res.locals.userInfo);
});

module.exports = router;