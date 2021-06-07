const express = require('express')
const router = new express.Router()
const userModel = require('../models/user.model')
const auth = require('../midleware/auth')
const adminAuth = require('../midleware/adminAuth')
const multer = require('multer')
//showAll
router.get('/all',adminAuth,async(req,res)=>{
    try {
        const users = await userModel.find()
        res.status(200).send({users})
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"no users to show"
        })
    }
})
//show all students for admin only 
router.get('/allstudents',adminAuth, async(req, res)=>{
    try{
        //search on data base 
        const users = await userModel.find({
            status: 'student'
        })   
        
        if (users=='') {
            res.send("no students yet")
        }
        else{
            res.status(200).send({users})
        }

    }
    catch(e){res.send(e)}
})
//show all teachers
router.get('/allteachers',adminAuth, async(req, res)=>{
    try{
        //search on data base 
        const users = await userModel.find({
            status: 'teacher'
        })   
        if (users=='') {
            res.send("no teachers yet")
        }
        else{
            res.status(200).send({users})
        }
    }
    catch(e){res.send(e)}
})
//show all parents
router.get('/allparents',adminAuth, async(req, res)=>{
    try{
        //search on data base 
        const users = await userModel.find({
            status: 'parents'
        })   
        
        if (users=='') {
            res.send("no parents yet")
        }
        else{
            res.status(200).send({users})
        }

    }
    catch(e){res.send(e)}
})
//create account
router.post('/createAccount', async (req,res)=>{
    try{
        
        const user = new userModel(req.body)
        console.log(user)
        await user.save()
        
        res.status(200).send({
            apiStatus: true,
            data: user,
            message:'Welcom to our Academy'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"failed to create account"
        })
    }
})
//login
router.post('/login',async(req,res)=>{
    try{
        const user = await userModel.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthtoken()
        res.status(200).send({
            apiStatus:true,
            data:{user, token},
            message:"user logged in"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"failed to login"
        })
    }
})
//logout
router.post('/logout',auth,async(req, res)=>{
    try{
        req.user.tokens =req.user.tokens.filter((element)=>{
            return element!=req.token
        })
        await req.user.save()
        res.status(200).send({
            apiStatus: true,
            data:'',
            message:'logged out'
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
})
//edit profile
router.patch('/user/profile', auth, async(req,res)=>{
    requestedUpdates = Object.keys(req.body)
    allowed=['username', 'password']
    isValid = requestedUpdates.every(update=> allowed.includes(update))
    if(!isValid) return res.send('invalid')
    try{
        requestedUpdates.forEach(update=> req.user[update] = req.body[update])
        await req.user.save()
        res.send('updated')
    }
    catch(e){
        res.send(e)}
})
//show profile
router.get('/myprofile',auth,(req,res)=>{
    res.send(req.user)
})
// activate account
router.get('/activate',auth, async(req, res)=>{
    try{
        const user = await userModel.findOne({
           '_id' : req.user._id
        })
        if(!user) throw new Error('invalid user id')
        user.accountStatus = true
        await user.save()
        res.status(200).send({
            apiStatus:true,
            data: user,
            message: 'user status updated'
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user activation error'
        })
    }
})
// deactivate account 
router.get('/deactivate',auth,async(req,res)=>{
    try{
        const user = await userModel.findOne({
            '_id' : req.user._id
         }) 
        user.accountStatus= false
        await user.save()
        res.status(200).send({
            apiStatus:true,
            data: user,
            message: 'user status updated'
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user deactivation error'
        })
    }
})
// remove account 
router.delete('/remove', auth, async(req,res)=>{
    try{
        const user = await userModel.findOne({
            '_id' : req.user._id
         })
        await user.remove()
        res.status(200).send({
            apiStatus:true,
            data:'deleted',
            message:"deleted"
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'user register error'
        })
    }
})

var upload = multer({ dest: 'images/profile' })
router.post('/profile', auth, upload.single('avatar'), async  (req, res)=> {
    filename=req.file.destination+ '/' + req.file.filename 
    fileWithExt = filename+'.'+ (req.file.originalname.split('.').pop())
    fs.rename(filename, fileWithExt, function(err) {
        if ( err ) console.log('ERROR: ' + err);
    });
    req.user.userProfile= fileWithExt
    await req.user.save()
    res.send(req.user)
})
//add image
imgName=''
let storage = multer.diskStorage({
    destination:function(req,res,cb){cb(null, 'images')},
    filename:function(req,file,cb){
        imgName = Date.now()+'.'+file.originalname.split('.').pop()
        cb(null, imgName)
    }
})
var upload1 = multer({storage:storage})
router.post('/upload', auth, upload1.single('img'), async(req,res)=>{
    res.send({name:'images/'+imgName})
})

module.exports=router