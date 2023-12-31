const events = require('../models/events')

const createEvent = async (req,res)=>{
    try{
        const newEvent = new events({
            title: req.body.title,
            description: req.body.description,
            starts_on: req.body.starts_on,
            ends_on: req.body.ends_on,
            imageURL: req.file.path,
            status: req.body.status,
            tags: req.body.tags,
        })
        await newEvent.save()
        res.send(newEvent)   
    }catch(e){
        res.status(500).send(e)
    }
}

const getAllEvents = async (req,res)=>{
    try{
        const allEvents = await events.find();
        res.send(allEvents)
    }
    catch(e){
        res.status(500).send(e);
    }
};

const getEventById = async (req, res) =>{
    try{
        const eventId = req.params.id;
        const theEvent = await events.findOne({_id:eventId});
        console.log(theEvent)
        if(!theEvent){
            res.status(404).send("Event not found!")
        }else{
            res.send(theEvent)
        }
        console.log(theEvent)
    }catch(e){
        res.status(500).send(e)
    }
};

const fetchEventImage = async (req, res) => {
    // Retrieve the trial from the database.
    try{
      const theEvent = await events.findById(req.params.eventId);
      if(!theEvent){
        return res.status(404).send('Event not found');
      }
      // Send the image file to the client.
      imageURL = `/home/oogway/unisec/${theEvent.imageURL}`
      console.log(imageURL)
      res.sendFile(imageURL);
    }catch(e){
      res.status(500).send(e);
    }
  };

const updateEventById = async (req, res)=>{
    try{
        const eventId = req.params.id;
        const updatedEvent = await events.findByIdAndUpdate(eventId, req.body)
        res.send(updatedEvent)
    }catch(e){
        res.status(500).send(e)
    }  
};

const deleteEventById = async (req, res) =>{
    try{
        const eventId = req.params.id;
        const result = await events.findByIdAndDelete({_id: eventId});
        if(!result){
            res.status(404).send("No such event!")
            return;
        }
        res.send("Event deleted successfully!");
    }catch(e){
        res.status(500).send(e)
    }
};

const getEventByTag = async (req, res)=>{
    try{
        const theTag = req.params.tag;
        const theEvents = await events.find({tags: "one"})
        console.log(theTag)
        res.send(theEvents);
    }catch(e){
        res.status(500).send(e);
    }
};

const getEventByStatus = async (req, res) =>{

    try{
        const theStatus = req.query.theStatus;
        // console.log(is);
        const theEvents = await events.find({status: theStatus})
        // console.log(typeof theEvents)
        if(Object.keys(theEvents).length === 0){
            res.status(404).send(`Event of status ${theStatus} is not found!`)
            return;
        }
        res.send(theEvents);
    }catch(e){
        res.status(500).send(e)
    }  
};

const searchEvent = async (req, res) =>{
    try{
        const searchKey = req.query.searchKey;
        const regex = new RegExp(searchKey, 'i')
        const searchResult = await events.find({
            $or:[
                {title: {$regex: regex}},
                {description: {$regex: regex}}
            ]
        })
        res.send(searchResult);
    }catch(e){
        res.status(500).send(e)
    }
};

module.exports = {createEvent, getAllEvents, getEventById, fetchEventImage, updateEventById, deleteEventById, getEventByTag, getEventByStatus, searchEvent};