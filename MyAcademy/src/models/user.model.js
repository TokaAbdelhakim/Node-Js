const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const courseModel = require('./course.model')
const userSchema = new mongoose.Schema({
    userId:{type:Number},
    fname:{type:String, required:true, trim:true},
    lname:{type:String, required:true, trim:true},
    accountStatus:{type:Boolean, default:false},
    country:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    birthdate:{
        type:Date
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)) throw new Error('invalid email')
        }
    },
    username:{
        type:String,
        unique:true,
        maxlength:8
    },
    password:{
        type:String,
        required:true,
        trim:true,
      /* validate(value){
        if(!validator.isAlphanumeric(value)) throw new Error('invalid password')
       }*/
    },
    status:{
        type:String,
        required:true,
        trim:true
    },
    school:{
        type:String,
        required:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId
    }],
    progress:{
        type:Number
    },
    userProfile:{
        type:String
    },
    tokens:[
        {token:{type:String, required:true}}
    ],
},{
    timestamps:true
}
)
userSchema.virtual('Course', {
    ref:'Course',
    localField:'_id',
    foreignField:'userId'
})
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    deleted = [ 'password', '_id', 'tokens','birthdate','country']
    deleted.forEach(element => {
        delete user[element]
    });
    return user
}
userSchema.methods.generateAuthtoken = async function (){
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWTKEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email,password)=>{
    const user = await User.findOne({email})
    if(!user) throw new Error('invalid email')
    const isvalid = await bcrypt.compare(password, user.password)
    if(!isvalid) throw new Error('invalid pass')
    return user
}

userSchema.pre('save',  async function (next){
    lastUser = await User.findOne({}).sort({_id:-1})
    user = this
    if(!user.username)  user.username =user._id
    
    //check on update
    if(!lastUser) user.userId=1
    else user.userId = lastUser.userId+1 
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 12)
    }
    next()
})


const User = mongoose.model('User',userSchema)
module.exports = User