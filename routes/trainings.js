const training = require('../models/trainings')
const express = require('express');
const router = express.Router();

const controllers = require('../controllers/trainings');
const projects = require('../models/projects');


//Add new training to the database
router.post("/create",controllers.createTraining )


//List all the trainings in the database
router.get("/", controllers.getAllTrainings)

//Get a training by id
router.get("findById/:id", controllers.findById)

//update a training specified by id
router.put("update/:id", controllers.updateTraining)

//Paginated view of trainings (3 at a time) sorted by start time 
router.get("/paginated/:pageNumber", controllers.getPaginated)

//Get trainings by status
router.get("/status/", controllers.getByStatus)

//Search for a training

router.get("/search", controllers.searchTraining)



module.exports = router;

