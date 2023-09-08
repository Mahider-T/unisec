const Projects = require('../models/projects');
const express = require('express');
const router = express.Router();


// Get all projects
router.get('/projects', async (req, res) => {
    try {
        const projects = await Projects.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});
// Get a specific project by project ID
router.get('/projects/:projectId', async (req, res) => {
    try {
        const project = await Projects.findById(req.params.projectId);
        res.json(project);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});
// Create a new project
router.post('/projects', async (req, res) => {
    const project = new Projects({
        title: req.body.title,
        description: req.body.description,
        starts_on: req.body.starts_on,
        ends_on: req.body.ends_on,
        status: req.body.status,
        tags: req.body.tags,
        participants: req.body.participants
    });

    try {
        const newProject = await project.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Update a project by project ID
router.patch('/projects/:projectId', async (req, res) => {
    try {
        const updatedProject = await Projects.findByIdAndUpdate(req.params.projectId, req.body, {new: true});
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});

// Delete a project by project ID
router.delete('/projects/:projectId', async (req, res) => {
    try {
        await Projects.findByIdAndDelete(req.params.projectId);
        res.json({message: 'Deleted Project'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get projects by status
router.get('/projects/status/:status', async (req, res) => {
    try {
        const projects = await Projects.find({status: req.params.status});
        res.json(projects);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get projects by tag
router.get('/projects/tag/:tag', async (req, res) => {
    try {
        const projects = await Projects.find({tags: req.params.tag});
        res.json(projects);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// Get projects by participant ID
router.get('/projects/participant/:participantId', async (req, res) => {
    try {
        const projects = await Projects.find({
            "participants._id": req.params.participantId
        });

        res.json(projects);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


// Get the count of all projects
router.get('/projects/count', async (req, res) => {
    try {
        const count = await Projects.countDocuments();
        res.json(count);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});


// Add a participant to a project
router.patch('/projects/:projectId/addParticipant', async (req, res) => {
    try {
        const updatedProject = await Projects.findByIdAndUpdate(req.params.projectId, {$push: {participants: req.body}}, {new: true});
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});


// Remove a participant from a project
router.patch('/projects/:projectId/removeParticipant', async (req, res) => {
    try {
        const updatedProject = await Projects.findByIdAndUpdate(req.params.projectId, {$pull: {participants: {name: req.body.name}}}, {new: true});
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
});


// Search projects by title or description
router.get('/search', async (req, res) => {
    const {query} = req.query;

    try {
        const projects = await Projects.find({
            $or: [{title: {$regex: query, $options: 'i'}}, {description: {$regex: query, $options: 'i'}}]
        });

        res.json(projects);
    } catch (err) {
        res.status(500).json({message: err.message});

    }
})

module.exports = router;

