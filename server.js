const express = require('express')
const favicon = require('express-favicon')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority'

// //
// if (process.env.NODE_ENV !== 'production'){
//     require('dotenv').config()
// }
// const flash = require('express-flash')
// const session = require('express-session')
// const passport = require('passport')
// const initializePassport = require('./passport-config')
// initializePassport(
//     passport, 
//     email => userd.find(user => user.email === email)
// )

// app.use(flash())
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false, 
//     saveUnintialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// //

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/Public'));
app.use(favicon(__dirname + '/Public/images/favicon.ico'));

mongoose.Promise = global.Promise;
mongoose.connect(url, () => {
    console.log('Connected to MongoDB Successfully!')
})

app.set('view engine', 'ejs') 

const indexRouter = require('./routes/pages')
const userRouter = require('./routes/users')
const bookingRouter = require('./routes/bookings')
const dmenuRouter = require('./routes/dmenus')
const lmenuRouter = require('./routes/lmenus')
const passport = require('passport')
app.use('/', indexRouter)
app.use('/', userRouter)
app.use('/', bookingRouter)
app.use('/', dmenuRouter)
app.use('/', lmenuRouter)


app.get('/', (req, res) => {
    res.render('index') 
})


app.listen(process.env.PORT || 5000)
