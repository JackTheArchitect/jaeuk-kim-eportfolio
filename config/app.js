// Modules
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
    // For Assignmnet 2
let session = require('express-session');
let flash = require('connect-flash');
let passport = require('passport');



// For Assignmnet 2
//Database setup
let mongoose = require('mongoose');
let dbURI = require('./db');

    // Connect to the Database (My Database: JaeukDB)
mongoose.connect(dbURI.AtlasDB);

// For Assignent2
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', ()=>{
  console.log('Connected to MongoDB...');
});



let app = express();

// For Assignent2
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: "sessionSecret"
}));

// Router variables
let indexRouter = require('../routes/index');
let aboutRouter = require('../routes/about');
let projectsRouter = require('../routes/projects');
let servicesRouter = require('../routes/services');
let contactRouter = require('../routes/contact');
    // For Assignment2
let inventoryRouter = require('../routes/inventory');
let usersContactRouter = require('../routes/users');



// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));


  // For Assignment2
    // Sets up passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());




// For Assignment1
app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/projects', projectsRouter);
app.use('/services', servicesRouter);
app.use('/contact', contactRouter);
// For Assignemnt2
app.use('/inventory', inventoryRouter); 
app.use('/users', usersContactRouter) // For users section



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

module.exports = app;
