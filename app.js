/*var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var monk = require('monk');
var db = monk('mongodb+srv://Davon2425:Horn2425@proday-86a1y.mongodb.net/test?retryWrites=true&w=majority'); //Change back

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;*/

//Declare modules
let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let path = require('path');
let exphbs = require('express-handlebars');

//Initialize app
const app = express();
app.use(morgan('dev'));

//Setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) =>{
  res.send("Testing");
});

//Handlebars view
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

//Setup MongoDB connection
mongoose.connect("mongodb+srv://Davon2425:Horn2425@proday-86a1y.mongodb.net/test?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if(!err) {console.log('MongoDB Connection Successful.')};
});
mongoose.set('useFindAndModify', false);
let db = mongoose.connection;

//Bind db on error
db.on('error', console.error.bind(console, 'MongoDB connection error'));

//Import data route
let data = require('./routes/data.route');

//Testing data controller
app.use('/data', data);

let port = process.env.PORT || 1234;
app.listen(port, () => {
console.log('Server is up and running on port number ' + port)});