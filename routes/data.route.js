var express = require('express');
var router = express.Router();
var Data = require('../models/data.model');

//Require the controller
let data_controller = require('../controllers/data.controller');
const { findById } = require('../models/data.model');
const { ObjectID } = require('mongodb');

//Data homepage
router.get('/', function (req, res){
res.render("data/addOrEdit", {
    viewTitle : "Insert Data"
    });
});

//List records
router.get('/list', function (req, res){
 
    Data.find((err, docs) =>{
        if (!err){
            const context = { dataDocument : docs.map(docs =>{
                return {
                    _id: docs._id,
                    name: docs.name,
                    grade: docs.grade
                }
            })};

            res.render('data/list', {
                dataDocument: context.dataDocument
            });
        }
        else{
            console.log("Error in retrieving data list." + err.message);
        }
    })
    });

router.post('/', function (req, res) {
    console.log(req.body._id);
    if (req.body._id == '')
        insertRecord(req, res);
    else
        updateRecord(req, res);
});

//Update function
function updateRecord(req, res){
    Data.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if (!err){res.redirect('data/list');}
        else{
            if (err.name == 'ValidationError'){
                console.log(err.message);
                handleValidationError(err, req.body);
                res.render('data/addOrEdit', {
                    viewTitle: 'Update Record',
                    record: req.body
                });
            }
        }
    });
};


router.get('/:id', (req, res) => {
    Data.findById(req.params.id, (err, doc) => {
        if (!err){
            const context = { dataDocument : doc};
            

            res.render("data/addOrEdit", {
                viewTitle: "Update Record",
                _id: context.dataDocument._id,
                name: context.dataDocument.name,
                grade: context.dataDocument.grade
            });
        }
        else {
            console.log("Error during update operation. " + err.message);
        }
    });
});

//Insertion function
function insertRecord(req, res) {
    var record = new Data();
    record._id = new ObjectID();
    record.name = req.body.name;
    record.grade = req.body.grade;
    record.save((err, doc) =>{
        if (!err)
            res.redirect('data/list');
        else{
                //Check for validation error
            if(err.name == 'ValidationError')  {
                console.log(err.message);
                handleValidationError(err, req.body);
                res.render("data/addOrEdit", {viewTitle : "Insert Data", record : req.body});
            }
            else
                console.log('Error during record insertion: ' + err);
        }
    });
    
};

//Deletion function
router.get('/delete/:id', (req, res) => {
    Data.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err){
            res.redirect('../list');
        }
        else{console.log('Error in record delete : ' + err.message)};
    });
});

//Validation error handler
function handleValidationError(err, body){
    for(field in err.errors)
    {
        switch (err.errors[field].path){
            case 'name':
                body['nameError'] =  err.errors[field].message;
                break;
            case 'grade':
                body['gradeError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
};

module.exports = router;