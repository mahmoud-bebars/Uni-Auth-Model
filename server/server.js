// importig packages (express,http-srrors,path)
const express = require('express')
const createError = require('http-errors')
const path = require('path')

// importig packages (cookie-parser,body-parser,express-session)
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

// importing packages (cors,morgan,dotenv)
var cors = require('cors')
const logger = require('morgan')
const dotenv = require('dotenv')

// router files imports
const authRouter = require('./routes/mainRouter')

//init express in app variable
const app = express()

// JWT importing package
const jwt = require('jsonwebtoken')

// database config file importing
const db = require('./config')

// dotenv setup
dotenv.config({ path: './.env' })

// cors handler setup
app.use(
  cors({
    // the cors is setted to the port 3000 only to use it with the react project but can be changed safely
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT'],
    credentials: true,
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'hbs')

// body & cookie parsers setup
app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))

// session handler setup
app.use(
  session({
    key: 'userid',
    secret: 'AUTH-SECRET',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
)

// app routers apply handlers
app.use('/', authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// check for the database connection is working
db.start.connect((err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('You are now connected with mysql database...')
  }
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
