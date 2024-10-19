const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({ 

    date: { 
        type: String, 
        required: true
    },  
    summary1: { 
        type: String, 
        required: true, 
    },
    city:{
        type:String,
        required: true, 
    }
}); 

module.exports = mongoose.model('summary', userSchema);