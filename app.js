var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
global.authTokens = {};
var indexRouter = require('./routes/index');
var infoRouter = require('./routes/contato');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var produtosRouter = require('./routes/produtos');
var sobreRouter = require('./routes/sobre');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/contato', infoRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/produtos', produtosRouter);
app.use('/sobre', sobreRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


