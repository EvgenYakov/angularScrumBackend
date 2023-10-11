const asyncHandler = require('express-async-handler')
const Project = require('./../models/project')
const Task = require('./../models/task')
const Sprint = require('./../models/sprint')

const getProjects = asyncHandler(async(req,res)=>{
    try {
        const projects = await Project.find({userId:req.user.id});
        res.status(200).json(projects)
    }catch (e) {
        res.status(500)
        throw new Error(e)
    }
})

const addProject = asyncHandler(async (req, res)=>{
    try {
        const {title,tags,date} = req.body
        const project = new Project({title,tags,userId:req.user._id,date,tasks:[],sprints:[]})
        await project.save();
        res.status(200).json(project)
    }catch (e) {
        console.log(e);
        res.status(400);
        throw new Error(e)
    }
})

const deleteProject = asyncHandler(async (req, res)=>{
    try {
        const id = req.params.id;
        await Task.deleteMany({projectId:id})
        await Sprint.deleteMany({projectId:id})
        await Project.deleteOne({_id:id})
        res.status(200).json(id)
    }catch (e) {
        console.log(e);
        res.status(400);
        throw new Error(e)
    }
})

module.exports = {
    getProjects,
    addProject,
    deleteProject
}