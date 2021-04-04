const mongoose = require('mongoose')

const pageSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    }

    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
})

module.exports = mongoose.model('Page', pageSchema)