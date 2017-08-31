var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');


// FOR THE SESSION API COOKIE
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

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




// MONGOOSE FOR THE API FOR DEALS
var mongoose = require('mongoose');
mongoose.connect('mongodb://<cathal>:<password10>@ds151117.mlab.com:51117/heroku_dvqzsrrg');
mongodb://<dbuser>:<dbpassword>@ds151117.mlab.com:51117/heroku_dvqzsrrg
//mongoose.connect('mongodb://localhost:27017/myDB');

// Holda connection
var db = mongoose.connection;

// log errors with connection to mongodb
db.on('error', console.error.bind(console, '###########MongoDB ERRIR - : '));

// ttl time to leave cookie 2 days 24 hours 60 mins 60 seconds
app.use(session({secret: 'myANONString', saveUninitialized: false, resave:false, cookie: {maxAge: 1000 * 60 * 60 * 24 * 2},
store: new MongoStore({mongooseConnection:db, ttl: 2 * 24 * 60 * 60})
}))

//SAVE CART TO API ASWELL
 app.post('/basket', function(req, res){
 var basket = req.body;

 // store basket in the session
 req.session.basket = basket;
 req.session.save(function(err){
 if(err){
   throw err;
 }
 res.json(req.session.basket);
})
});

// COOKIE SESSION API GETT
 app.get('/basket', function(req, res){
 if(typeof req.session.basket !== 'undefined'){
   res.json(req.session.basket);
 }
});

// DEALS COLLECTION
var Deals = require('./collections/deals.js');

// POST DEALS
app.post('/deals', function(req, res){
  var deal = req.body;

  Deals.create(deal, function(err, deals){
    if(err){
      throw err;
    }
    res.json(deals);
  })
});

// GET DEALS
app.get('/deals', function(req, res){
  Deals.find(function(err, deals){
    if(err){
      throw err;
    }
    res.json(deals);
  })
});

// DELETE DEALS
app.delete('/deals/:_id', function(req, res){
  var query = {_id: req.params._id};
  Deals.remove(query, function(err, deals){
    if(err){
      console.log("Delete deal success: ", err);
    }
      res.json(deals);
    })
});

// API IMAGES

app.get('/images', function(req, res){
  const holdImages  = __dirname + '/public/images/';  // make a dir for storing images

  // get the file system
  const filesystem = require('fs');

  // read files inside folder directory
  filesystem.readdir(holdImages, function(err, files){
    if(err){
      return console.error(err);
    }
    const filesArray =[];

    files.forEach(function(file){
      filesArray.push({name:file});
    });

    // return array with image filenames
    res.json(filesArray);
  });
});

// App listens on port 3001
app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log('API running on 3001');
})
