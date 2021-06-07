const mongoose = require('mongoose')
// const validator = require('validator')
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')

const courseSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        // required:true,
        ref:'User'
    },
    content:{type:String, trim:true, required:true},
    image:{type:String, default:null},
    video:{type:String,default:null},
    numOftrainees:{type:Number, default:0},
    allowedAge:{type:Number},
},
{timestamps:true}
)
const Course = mongoose.model('Course', courseSchema)
module.exports = Course