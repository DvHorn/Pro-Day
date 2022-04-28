const express = require('express');
const router = express.Router();

//Require the controllers
const product_controller = require('../controllers/product.controller');

router.get('/test', product_controller.test);

module.exports = router;