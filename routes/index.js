var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('mongodb+srv://ProDayAdmin:ProDay123@cluster0-hrpvf.mongodb.net/test?retryWrites=true&w=majority');

/* GET home page. */
router.get('/', function(req, res, next) {
  db.collection('rawData').find()
  .then(/* ... */)
  .catch(/* ... */)
res.render('index.ejs', {})
});

module.exports = router;
