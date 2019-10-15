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
const url = config.mongodb.url

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser());
app.use(fileUpload())

//mongoose.connect(url, options).then(() => {
  console.log('Mongodb Connected at: ', url);
  // Require MongoDB Schema
  require('./models/User')
  require('./models/Student')
  require('./models/Course')
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
  const PythonConnector = require('./routes/PythonConnector')
  // use module
  app.use('/auth', auth) //auth/login
  app.use('/cour', passportAuth, tokenToReq, course)
  app.use('/stu', student)
  app.use('/deep_server',PythonConnector)
/*}).catch(err => {
  console.error(err);
  process.exit()
})*/

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