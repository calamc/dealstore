require('babel-core/register')({
 "presets":["es2015", "react", "stage-1"]
});

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var requestHandler = require('./requestHandler.js');

// HTTP PROXY

var httpProxy = require('http-proxy');
var app = express();
const apiProxy = httpProxy.createProxyServer({target:"http://localhost:3001"});

app.use('/api', function(req, res){
  apiProxy.web(req, res);})



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




// // MONGOOSE FOR THE API FOR DEALS
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/myDB');
//
// // DEALS COLLECTION
// var Deals = require('./collections/deals.js');
//
// // POST DEALS
// app.post('/deals', function(req, res){
//   var deal = req.body;
//
//   Deals.create(deal, function(err, deals){
//     if(err){
//       throw err;
//     }
//     res.json(deals);
//   })
// });
//
// // GET DEALS
// app.get('/deals', function(req, res){
//   Deals.find(function(err, deals){
//     if(err){
//       throw err;
//     }
//     res.json(deals);
//   })
// });
//
// // DELETE DEALS
// app.delete('/deals/:_id', function(req, res){
//   var query = {_id: req.params._id};
//   Deals.remove(query, function(err, deals){
//     if(err){
//       throw err;
//     }
//       res.json(deals);
//     })
// });

// app.get('*', function(req, res){
//  res.sendFile(path.resolve(__dirname,'public', 'index.html'))
// });

app.set('view engine', 'ejs');

app.use(requestHandler);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;