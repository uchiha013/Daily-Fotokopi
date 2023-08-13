const express = require('express');
const path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const app = express();

var index = require('./routes/index');
var login = require('./routes/login');
var register = require('./routes/register');
var order = require('./routes/order');
var about = require('./routes/about');
// var auth = require('./routes/auth');
// var pesanan = require('./routes/pesanan');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set( 'view engine', 'ejs' );

app.use('/', index);
app.use('/login', login);
app.use('/register', register);
app.use('/order', order);
app.use('/faq', about);
// app.use('/api', auth);
// app.use('/pesanan', pesanan);

app.get('/', (request, response) => {
  return response.send('OK');
});

//Call Javascript and Stylesheets
app.use(express.static('public'));
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
// port must be set to 3000 because incoming http requests are routed from port 80 to port 8080
var server = app.listen(3000, function () {
   console.log('Node app is running on port 3000');
});
module.exports = app;