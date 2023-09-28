const Projects = require('../models/projects');

const getAllProjects = async (req, res) => {
    try {
        const projects = await Projects.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Projects.findById(req.params.projectId);
        res.json(project);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const createProject = async (req, res) => {
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
};

const updateProject = async (req, res) => {
    try {
        const updatedProject = await Projects.findByIdAndUpdate(req.params.projectId, req.body, {new: true});
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const deleteProject = async (req, res) => {
    try {
        await Projects.findByIdAndDelete(req.params.projectId);
        res.json({message: 'Deleted Project'});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getProjectByStatus = async (req, res) => {
    try {
        const projects = await Projects.find({status: req.params.status});
        res.json(projects);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const getProjectsByTag = async (req, res) => {
    try {
        const projects = await Projects.find({tags: req.params.tag});
        res.json(projects);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getProjectByParticipant = async (req, res) => {
    try {
        const projects = await Projects.find({
            "participants._id": req.params.participantId
        });

        res.json(projects);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const countProjects = async (req, res) => {
    try {
        const count = await Projects.countDocuments();
        res.json(count);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const addParticipant = async (req, res) => {
    try {
        const updatedProject = await Projects.findByIdAndUpdate(req.params.projectId, {$push: {participants: req.body}}, {new: true});
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const removeParticipant =  async (req, res) => {
    try {
        const updatedProject = await Projects.findByIdAndUpdate(req.params.projectId, {$pull: {participants: {name: req.body.name}}}, {new: true});
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

const searchProject = async (req, res) => {
    const query = req.query.key;
    console.log(query)

    try {
        const projects = await Projects.find({
            $or: [{title: {$regex: query, $options: 'i'}}, {description: {$regex: query, $options: 'i'}}]
        });

        res.json(projects);
    } catch (err) {
        res.status(500).json({message: err.message});

    }
}

module.exports = {getAllProjects, getProjectById, createProject, updateProject, deleteProject, getProjectByStatus, getProjectsByTag, getProjectByParticipant, countProjects, addParticipant, removeParticipant, searchProject}