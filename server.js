const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const logger = require('morgan')
const http = require('http')
const mongoose = require('mongoose')
const passport = require('passport')
const fileUpload = require('express-fileupload')
const jwtDecode = require('jwt-decode')
const config = require('./config')
const app = express();
const port = process.env.port || 3001
app.set('port', port)
const server = http.createServer(app)
const io = require('socket.io')(server)
const User = require('./models/User')


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser());
app.use(fileUpload())

const { url, options } = config.mongodb
mongoose.connect(url, options).then(() => {
  console.log('Mongodb Connected at: ', url);
  // Require MongoDB Schema
  require('./models/User')
  require('./models/Student')
  require('./models/Course')
  require('./models/Class')
  require('./models/Semester')
  require('./models/CheckIn')
  // require passport middleware
  app.use(passport.initialize())
  require('./middleware/passport')(passport)
  const passportAuth = passport.authenticate('jwt', { session: false })
  const tokenToReq = (req, res, next) => {
    token = (req.headers.authorization);
    decode = jwtDecode(token)
    req.uid = decode.id //user objectid
    next()
  }
  // require module routes
  const auth = require('./routes/auth')
  const student = require('./routes/student')
  const course = require('./routes/course')
  const classU = require('./routes/class')
  const semester = require('./routes/semester')
  const options = require('./routes/options')
  const checkIn = require('./routes/checkIn')
  const PythonConnector = require('./routes/PythonConnector')
  //require('./routes/socket')(io) // disable socket.io
  // use module
  app.use('/auth', auth) //auth/login
  app.use('/semester', passportAuth, tokenToReq, semester)
  app.use('/cour', passportAuth, tokenToReq, course)
  app.use('/stu', passportAuth, tokenToReq, student)
  app.use('/clas', passportAuth, tokenToReq, classU)
  app.use('/opt', passportAuth, tokenToReq, options)
  app.use('/checkIn', passportAuth, tokenToReq, checkIn)
  app.use('/deep_server', passportAuth, tokenToReq, PythonConnector)
}).catch(err => {
  console.error(err);
  //process.exit()
})

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.json(req.locals)
})

server.listen(port, async () => {
  console.log("==================================================");
  console.log('Started listening on post: ' + port);
  console.log("==================================================");
})


//------------------------------------------------------------------------------------------//
//passport
//------------------------------------------------------------------------------------------//
require('dotenv').config();

//var express = require('express');
//var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;


// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: '445952655996280',
    clientSecret: '3633c897e9e1aa0da56ed118ff8b0cbf',
    callbackURL: '/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


// Create a new Express application.
//var app = express();

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.
app.get('/',
  function(req, res) {
    res.send({ user: req.user });
  });

// app.get('/login',
//   function(req, res){
//     res.render('login');
//   });

app.get('/login/facebook',
  passport.authenticate('facebook'));

app.get('/return', 
  passport.authenticate('facebook',),
  function(req, res) {
    console.log(req.data);
    res.send({ok:true})
    
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.send( { user: req.user });
  });