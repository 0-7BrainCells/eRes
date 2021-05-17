if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const express = require('express')
const favicon = require('express-favicon')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const app = express()

const passport = require('passport')
const passportconfig = require('./passport-config')
const methodOverride = require('method-override')
const flash = require('express-flash')
const session = require('express-session')

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority'
mongoose.Promise = global.Promise;
mongoose.connect(url, () => {
    console.log('Connected to MongoDB Successfully!')
})

app.set('view engine', 'ejs') 

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, 
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/Public'));
app.use(favicon(__dirname + '/Public/images/favicon.ico'));

const indexRouter = require('./routes/pages')
const userRouter = require('./routes/users')
const bookingRouter = require('./routes/bookings')
const dmenuRouter = require('./routes/dmenus')
const lmenuRouter = require('./routes/lmenus')
const discountRouter = require('./routes/discounts')

app.use('/', indexRouter)
app.use('/', userRouter)
app.use('/', bookingRouter)
app.use('/', dmenuRouter)
app.use('/', lmenuRouter)
app.use('/', discountRouter)

app.get('/', (req, res) => {
    res.render('index') 
})

app.use(function (req, res, next) {
    res.status(404).send("Error 404: Sorry can't find that!")
  });

app.listen(process.env.PORT || 5000)
