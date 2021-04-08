const express = require('express')
const favicon = require('express-favicon')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const url = 'mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority'


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
app.use('/', indexRouter)
app.use('/', userRouter)
app.use('/', bookingRouter)
app.use('/', dmenuRouter)
app.use('/', lmenuRouter)


app.get('/', (req, res) => {
    res.render('index') 
})


app.listen(process.env.PORT || 5000)
