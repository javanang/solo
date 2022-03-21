// const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

const cookieController = {};

// app.use(cookieParser());

cookieController.setSSIDCookie = (req, res, next) => {
    res.cookie('ssid', res.locals.userId, {
      httpOnly: false,
      expires: new Date(Date.now() + 500000),
    });
    return next();
  }

  module.exports = cookieController;