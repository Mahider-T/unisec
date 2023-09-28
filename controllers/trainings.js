const training = require('../models/trainings')

const createTraining = async(req,res)=>{
    try{
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
    }
    
}


const getAllTrainings = async(req, res)=>{
    try{
        const trainings = await training.find({}).sort({starts_on : -1})
        res.send(trainings);
    }catch(error){
        res.status(500).send(error)
    }    
};

const findById = async(req,res)=>{
    try{
        console.log(req.params.id)
        const oneTraining = await training.findOne({
            _id: req.params.id
        })
        res.send(oneTraining)
    }catch(error){
        res.status(500).send(error)
    }
};

const updateTraining = async(req,res)=>{
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
}

const getPaginated = async(req, res)=>{
    const pageNumber = req.params.pageNumber || 1;
    const pageSize = 3;
    try{
        const paginatedTrainings = await training.find({}).sort({starts_on : 1}).skip((pageNumber - 1)*pageSize).limit(pageSize)
        res.json(paginatedTrainings)
    }
    catch(error){
        res.status(500).send(error);
    }  
}

const getByStatus = async(req, res)=>{
    const key = req.query.key;
    if( !(key in ["Done", "Underway", "Upcoming"])){
        res.json({"error": "No such status"})
    }
    try{
        const trainings = await training.find({status: key})
        res.send(trainings)
    }catch(error){
        res.status(500).send(error.message)
    }
}

const searchTraining = async(req, res)=>{
    const key = req.query.key;
    const regex = new RegExp(key, 'i');
    try{
        const trainings = await training.find({
            $or:[{title: {$regex: regex}},
                 {description: {$regex: regex}}
                ]
        })
        res.send(trainings)
    }catch(e){
        res.send(e)
    }
}

module.exports = {createTraining, getAllTrainings, findById, updateTraining, getPaginated, getByStatus, searchTraining}