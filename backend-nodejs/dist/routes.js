"use strict";
var _a;
var express = require('express');
var _b = require('celebrate'), celebrate = _b.celebrate, Segments = _b.Segments, Joi = _b.Joi;
var routes = express.Router();
var DriveController = require('./controllers/DriveController');
routes.post('/api/v1/drive', celebrate((_a = {},
    _a[Segments.BODY] = Joi.object().keys({
        command: Joi.string().required().min(0),
        currentX: Joi.number().required().min(0).max(5),
        currentY: Joi.number().required().min(0).max(5),
        currentDirection: Joi.string().required().valid('N', 'E', 'S', 'W', 'n', 'e', 's', 'w')
    }),
    _a)), DriveController.move);
module.exports = routes;
