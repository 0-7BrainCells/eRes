// THIS PAGE WILL BE THE HOMEBASE FOR ALL PAGES THAT THE WEBSITE WILL HOLD 
// to add a new page (1/3) do the whole app.get(etc...)

const express = require('express')
const mongoose = require('mongoose')
const pageRouter = require('./routes/pages')
const app = express()

app.use( express.static( "im" ) );

mongoose.connect('mongodb://localhost/eRes', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')

app.use('/pages', pageRouter)

app.get('/', (req, res) => {
    const pages = [{
        title: 'eResto Registration', 
        createdAt: new Date()
        //createAt: Date.now()
        //decription: 'Test description'
},
{
        title: 'eResto Staff Login', 
        createdAt: new Date()
        //decription: 'Test description'
    }]
    res.render('pages/index', { pages: pages}) //9:30 in video { pages: pages}, {text: 'Hello'}
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

app.post("/login")


app.listen(5000)