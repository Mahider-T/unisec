const training = require('../models/trainings')
const express = require('express');
const router = express.Router();

router.use(express.urlencoded({extended: true}))
router.use(express.json())

//Add new training to the database
router.post("/create", async(req,res)=>{
    try{
<<<<<<< HEAD
        // console.log(req.body)
        // const {title, description, starts_on, ends_on} = req.body;
        // training.create({title, description, starts_on, ends_on}).then((train) =>{console.log(train)}).catch((error)=>{console.log(error)})
        const newTraining = new training({
            title: req.body.title,
            description: req.body.description,
            starts_on: req.body.starts_on,
            ends_on: req.body.ends_on,
            status: req.body.status
        })
        await newTraining.save()
        res.send(newTraining)
    }
    catch(error){
=======
        // const newTraining  = new training({
        //     title : req.body.title,
        //     description : req.body.description,
        //     starts_on : req.body.starts_on,
        //     ends_on : req.body.ends_on
        // })
        // await newTraining.save()
        let request = req;
        // console.log(req);
        res.send({"one": `${req.body.body}`})
    }catch(error){
>>>>>>> main
        res.status(500).send(error)
    }
    
})


//List all the trainings in the database
router.get("/", async(req, res)=>{
    try{
        const trainings = await training.find({}).sort({starts_on : -1})
        res.send(trainings);
    }catch(error){
        res.status(500).send(error)
    }    
})

//Get a training by id
router.get("/:id", async(req,res)=>{
    try{
        console.log(req.params.id)
        const oneTraining = await training.findOne({
            _id: req.params.id
        })
        res.send(oneTraining)
    }catch(error){
        res.status(500).send(error)
    }
})

//update a training specified by id
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

//Paginated view of trainings (3 at a time) sorted by start time 
router.get("/paginated/:pageNumber", async(req, res)=>{
    const pageNumber = req.params.pageNumber || 1;
    const pageSize = 3;
    try{
        const paginatedTrainings = await training.find({}).sort({starts_on : 1}).skip((pageNumber - 1)*pageSize).limit(pageSize)
        res.json(paginatedTrainings)
    }
    catch(error){
        res.status(500).send(error);
    }  
})

//Get all trainings that are of "Done" status

router.get("/status/done", async(req, res)=>{
    try{
        const done = await training.find({status: "Done"})
        res.send(done)
    }catch(error){
        res.status(500).send(error.message)
    }
})

router.get("/status/underway", async(req, res)=>{
    try{
        const underway = await training.find({status: "Underway"})
        res.send(underway)
    }catch(error){
        res.status(500).send(error)
    }
})

router.get("/status/upcoming", async(req, res)=>{
    try{
        const  upcoming = await training.find({status: "Upcoming"})
        res.send(upcoming)
    }catch(error){
        res.status(500).send(error)
    }
})



module.exports = router;

