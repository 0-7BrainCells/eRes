const express = require('express')
const indexRouter = require('./routes/pages')
const userRouter = require('./routes/users')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/Public'));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://admin:admin@eres.k9zxh.mongodb.net/eRes?retryWrites=true&w=majority', () => {
    console.log('Connected to MongoDB Successfully!')
})

app.set('view engine', 'ejs') 

app.use('/', indexRouter)
app.use('/users', userRouter)

app.get('/', (req, res) => {
    const pages = [{
        title: 'eResto Registration', 
        createdAt: new Date()
},
{
        title: 'eResto Staff Login', 
        createdAt: new Date()
    }]
    res.render('index', { pages: pages}) 
})

app.get('/', (req, res) => {
    const pages = [{
        title: 'Lunch Menu',
    }]
    res.render('pages/index', { pages: pages}) //links this page to the pages.js
})

app.get('/', (req, res) => {
    const pages = [{
        title: 'Dinner Menu',
    }]
    res.render('pages/index', { pages: pages}) //links this page to the pages.js
})

app.listen(5000)
