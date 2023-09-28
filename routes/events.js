const events = require('../models/events');
const express = require('express');
const upload = require("../config/event-multer")
const router = express.Router();
router.use(express.json())
const controllers = require('../controllers/events');


//Create an event
router.post('/create',upload.single('image'), controllers.createEvent);

//Get a list of all events
router.get("/", controllers.getAllEvents)

//Get event by id
router.get("/find/:id", controllers.getEventById)

//fetch an image of an event
router.get('/eventImage/:eventId', controllers.fetchEventImage);

//Update event by id
router.put("/:id", controllers.updateEventById)

//Delete event by id
router.delete("/:id", controllers.deleteEventById)

//Get event by tag
router.get("/tags/:tag", controllers.getEventByTag);

//Get event by status
router.get("/status", controllers.getEventByStatus);

//Search an event 
//Returns all events that match the user entry in title or description
router.get("/search", controllers.searchEvent)

module.exports = router;