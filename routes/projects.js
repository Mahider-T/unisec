const Projects = require('../models/projects');
const express = require('express');
const router = express.Router();
router.use(express.json())

const controllers = require('../controllers/projects')


// Get all projects
router.get('/', controllers.getAllProjects);

// Get a specific project by project ID
router.get('getProject/:projectId', controllers.getProjectById);

// Create a new project
router.post('/', controllers.createProject);

// Update a project by project ID
router.patch('updateProject/:projectId', controllers.updateProject);

// Delete a project by project ID
router.delete('/deleteProject/:projectId', controllers.deleteProject);

// Get projects by status
router.get('/status/:status', controllers.getProjectByStatus);

// Get projects by tag
router.get('/tag/:tag', controllers.getProjectsByTag);

// Get projects by participant ID
router.get('/participant/:participantId', controllers.getProjectByParticipant);


// Get the count of all projects
router.get('/projects/count', controllers.countProjects);


// Add a participant to a project
router.patch('addParticipant/:projectId/', controllers.addParticipant);


// Remove a participant from a project
router.patch('removeParticipant/:projectId/removeParticipant',controllers.removeParticipant);


// Search projects by title or description
router.get('/search', controllers.searchProject)

module.exports = router;

