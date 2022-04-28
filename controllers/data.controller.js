var model = require('../models/data.model');
let data = model();

exports.test = (req, res) => {
    res.send('From the data controller!');
    };

exports.create = (req, res) => {
    
};