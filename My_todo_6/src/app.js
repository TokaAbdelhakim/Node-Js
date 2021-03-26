const express = require('express')
const hbs = require('hbs')
const path = require('path')
const fetch = require ('node-fetch')
const { json } = require('express');
const port = 3000
const app = express()
const router = express.Router()

app.set('view engine','hbs')

const publicpath = path.join(__dirname,'../public')
const viewspath = path.join(__dirname,'../frontend/views')
const partialsdir = path.join(__dirname,'../frontend/partials')

app.use(express.static(publicpath))
app.set('views',viewspath)
hbs.registerPartials(partialsdir) //provides a quick way to load all partials from a specific directory
const tasks =[]
app.get('',(req,res)=>{
    res.render('home',{
        pageName: 'home page',
        userName:'Toka'
    })
})
app.get('/allPosts',async(req,res)=>{
    try{
        fdata = await fetch('https://jsonplaceholder.typicode.com/posts')

        posts = await fdata.json()
        res.render('allposts',{
            posts:posts
        })
    }
    catch(e){
        res.redirect('404')
    }
})

app.get('/allPosts/:id', async(req,res)=>{
    id=req.params.id
    try{
        fdata = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        post =await fdata.json()
        res.render('singlePost',{
            post: post
        })
    }
    catch(e){
        res.redirect('404')
    }
})
app.get('/addTask',(req,res)=>{
    if (req.query.title && req.query.body){
        task = {
            title: req.query.title,
            body: req.query.body
        }
        tasks.push(task)
        res.redirect('/allTasks')
    }
    else{
        res.render('addTask.hbs')
    }
    
})

app.get('/alltasks',(req,res)=>{
    res.render('alltasks',{
        pageName: 'All tasks',
        tasks:tasks
    })
})

app.get('/allTasks/:id', (req, res)=>{
    const id = req.params.id
    res.render('singleTask',{
        pageName: 'Single Task',
        task : tasks[id] //{title:'sh', body:'gedvh', userId:'hh'}
    })
})

/*
app.delete('/allTasks/:id', (req, res)=>{
    const id = req.params.id
    console.log("hi")
        tasks.splice(id,1)
        res.render('alltasks',{
            pageName: 'All tasks',
            tasks:tasks
        })

})*/

app.get('*',(req,res)=>{
    res.render('404',{
        pageName: '404 Error'
    })
})



app.listen(port)