const express = require('express')
const app = express();
const db = require('../connections')
const blog = require('../models/blog');
const { any } = require('webidl-conversions');
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/blog', async (req,res) => {
    blogs = await blog.find({})
    res.json(blogs)
})
app.post('/blog/create', async(req,res)=>{
    const {title, author} = req.body;
    try{
        const newBlog = await blog.create(req.body)
        console.log(req.body)
        res.json(newBlog)
    }catch(error){
        res.status(500).send(error)
    }
})

app.listen(8080, ()=>{
    console.log("Listening on port 8080")
})


