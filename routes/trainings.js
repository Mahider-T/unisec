const training = require('../models/trainings')
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: true}))
router.use(express.json())

router.post("/create", async(req,res)=>{
    try{
        // console.log(req.body)
        // const {title, description, starts_on, ends_on} = req.body;
        // training.create({title, description, starts_on, ends_on}).then((train) =>{console.log(train)}).catch((error)=>{console.log(error)})
        const newTraining = new training({
            title: req.body.title,
            description: req.body.description,
            starts_on: req.body.starts_on,
            ends_on: req.body.ends_on
        })
        await newTraining.save()
        res.send(newTraining)
    }
    catch(error){
        res.status(500).send(error)
    }
    
})

router.get("/", async(req, res)=>{
    try{
        const trainings = await training.find({})
        res.send(trainings);
    }catch(error){
        res.status(500).send(error)
    }    
})
router.get("/:id", async(req,res)=>{
    try{
        console.log(trainingId)
        const oneTraining = await training.findOne({
            _id: req.params.id
        })
        res.send(oneTraining)
    }catch(error){
        res.status(500).send(error)
    }
})

router.put("/:id", async(req,res)=>{
    id = req.params.id;
    const exists = await training.findOne({_id: id})
    if(!exists){
        res.status(404).send("Training not found") 
        return;
    }
    const updated = {$set:{
        title:req.body.title,
        description:req.body.description,
        starts_on:req.body.starts_on,
        status:req.body.status
    }}
    const filter = {_id: id}
    try{
        await training.updateOne(filter, updated);
        res.send(await training.findOne({_id: id}))
    }catch(error){
        res.status(500).send(error)
    }

})


module.exports = router;

