const express = require('express')
const pageRouter = require('./routes/pages')
const app = express()

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
        title: 'eRestaurant Login', 
        createdAt: new Date()
        //decription: 'Test description'
    }]
    res.render('pages/index', { pages: pages}) //9:30 in video { pages: pages}, {text: 'Hello'}
})


app.post("/login")


app.listen(5000)