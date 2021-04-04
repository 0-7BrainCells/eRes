const express = require('express')
const mongoose = require('mongoose')
const pageRouter = require('./routes/pages')
const app = express()

// mongoose.connect('mongodb://localhost/eRes', {
//     useNewUrlParser: true, useUnifiedTopology: true
// })
//creating the db w the link instead of localhost like the tut
//copied from Henry's code
mongoose.connect('mongodb+srv://admin:<eres>@eres.k9zxh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', () => {

    console.log('Connected to MongoDB Successfully!')

})

app.set('view engine', 'ejs')

app.use('/pages', pageRouter)
app.use(express.urlencoded({ extended: false }))

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


app.post("/login")


app.listen(5000)