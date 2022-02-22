const express = require('express');
const {celebrate, Segments, Joi} = require ('celebrate');
const routes = express.Router();

const DriveController = require('./controllers/DriveController');

routes.post('/api/v1/drive', celebrate({
    [Segments.BODY]:Joi.object().keys({
        command: Joi.string().required().min(0),
        currentX: Joi.number().required().min(0).max(5),
        currentY: Joi.number().required().min(0).max(5),
        currentDirection: Joi.string().required().valid('N', 'E', 'S', 'W', 'n', 'e', 's', 'w')
    })
}), DriveController.move);

module.exports = routes;