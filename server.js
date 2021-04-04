const express = require('express')
const pageRouter = require('./routes/pages')
const app = express()

app.set('view engine', 'ejs')

app.use('/pages', pageRouter)

app.get('/', (req, res) => {
    const pages = [{
        title: 'Login', 
        //createAt: Date.now()
        //decription: 'Test description'
    }]
    res.render('index', { pages: pages}) //9:30 in video { pages: pages}, {text: 'Hello'}
})


app.listen(5000)