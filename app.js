//MARK: - Modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const useragent = require('express-useragent')
const { swaggerUi, specs } = require('./config/swaggerconfig')

var app = express();

//MARK: - view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(useragent.express())

//MARK: - router 등록
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

let adminRouter = require('./routes/adminrouter');
let mypageRouter = require('./routes/mypagerouter');
let memberAuthRouter = require('./routes/memberauthrouter')
let notificationRouter = require('./routes/notificationrouter')
let homeRouter = require('./routes/homerouter')
let fireRouter = require('./routes/firerouter')

//MARK: - router 사용
//http://{IP}:{PORT}/{routerName}/...
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mmccms', adminRouter)
app.use('/mypage', mypageRouter)
app.use('/auth', memberAuthRouter)
app.use('/notification', notificationRouter)
app.use('/home', homeRouter)
app.use('/fire', fireRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

//MARK: - catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//MARK: - error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//MARK: - Exports
module.exports = app;
