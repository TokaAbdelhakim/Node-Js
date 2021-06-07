const express = require('express')
const router = new express.Router()
const courseModel = require('../models/course.model')
const auth = require('../midleware/auth')
const adminAuth = require('../midleware/adminAuth')
const multer = require('multer')

router.post('/addcourse', adminAuth, async(req,res)=>{
    try{
        const newCourse = new courseModel({
            ...req.body
        })
        await newCourse.save()
        res.status(200).send({
            apiStatus: true,
            data: newCourse,
            message:'newCourse added'
        })
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'adding course error'
        })
    }
})
// add user course
router.post('/addusercourse', auth, async(req,res)=>{
    try{
        const newCourse = req.body.courseid      
        req.user.courses.push(newCourse)
        await req.user.save()
        res.status(200).send({
            apiStatus: true,
            data: newCourse,
            message:'newCourse added'
        })
    }
    catch(error){
         res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'adding course error'
        })
    }
})
//get user courses
router.get('/course',auth, async(req,res)=>{
    let match = {}
    let sort ={}
    if(req.query.courseId) match.content = req.query.content
    if(req.query.sortBy){
        const part = req.query.sortBy.split(':')
        sort[part[0]] = part[1]=='desc'?-1:1
    }
    try{
        await req.user.populate({
            path:'Posts' ,
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:(parseInt(req.query.page)*parseInt(req.query.limit)),
                sort
            }
        }).execPopulate()
        res.send(req.user.Courses)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'error'
        })
    }
})
//get single course
router.get('/course/:id', auth, async(req,res)=>{
    try{
        const _id = req.params.id
        const course = await courseModel.findOne({ _id , userId: req.user._id})
        if(!course) throw new Error('invalid course id')
        res.send(course)
    }
    catch(error){
        res.status(500).send({
            apiStatus: false,
            data: error.message,
            message:'error'
        })
    }
}) 

module.exports=router