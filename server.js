const express = require('express')
const pageRouter = require('./routes/pages')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('URL', () => {
    console.log('Connected to MongoDB Successfully!')
})


app.set('view engine', 'ejs')

app.use('/pages', pageRouter)

app.get('/', (req, res) => {
    const pages = [{
        title: 'eRestaurant Registration', 
        createdAt: new Date()
        //createAt: Date.now()
        //decription: 'Test description'
},
{
        title: 'eRestaurant Staff Login', 
        createdAt: new Date()
        //decription: 'Test description'
    }]
    res.render('pages/index', { pages: pages}) //9:30 in video { pages: pages}, {text: 'Hello'}
})


app.post("/login")


app.listen(5000)