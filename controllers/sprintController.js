const asyncHandler = require("express-async-handler");
const Sprint = require("../models/sprint");
const Project = require("../models/project");
const Task = require("../models/task");


const getSprints = asyncHandler(async (req,res)=>{
    try{
        const id = req.params.id;
        const sprints = await Sprint.find({projectId:id}).populate('tasks')
        res.status(200).json(sprints)
    }catch (e) {
        console.log(e)
        res.status(400);
        throw new Error(e)
    }
})

const addSprint = asyncHandler(async(req,res)=>{
    try{
        const id = req.params.id;
        const {title, dateEnd,dateStart} = req.body;
        const sprint = new Sprint({title,dateEnd,dateStart,status:"started",projectId:id, tasks:[]});
        const project = await Project.findOne({_id:id})
        project.sprints.push(sprint._id);
        await Project.findByIdAndUpdate(id, project,{new:true})
        await sprint.save()
        res.status(200).json(sprint)
    }catch (e){
        console.log(e)
        res.status(400);
        throw new Error(e)
    }
})

const pushTaskToSprint = asyncHandler(async(req,res)=>{
    try{
        const id = req.params.id;
        const taskId = req.body.id;
        await Sprint.updateOne({_id:id},{$push:{tasks:taskId}})
        await Task.updateOne({_id:taskId},{$set:{sprintId:id}})
        res.status(200).json(taskId)
    }catch (e) {
        console.log(e)
        res.status(400);
        throw new Error(e)
    }
})

const deleteTaskFromSprint = asyncHandler(async(req,res)=>{
    try{
        const id = req.params.id;
        const taskId = req.body.id;
        await Sprint.updateOne({_id:id},{$pull:{tasks:taskId}})
        await Task.updateOne({_id:taskId},{$unset:{sprintId:id}})
        res.status(200).json(taskId)
    }catch (e) {
        console.log(e)
        res.status(400);
        throw new Error(e)
    }
})

const getSprint = asyncHandler(async (req,res)=>{
    try {
        const id = req.params.id
        const sprint = await Sprint.findOne({_id:id}).populate('tasks')
        res.status(200).json(sprint)
    }catch (e) {
        console.log(e);
        res.status(400);
        throw new Error(e);
    }
})


const editSprint = asyncHandler(async (req,res)=>{
    try {
        const id = req.params.id
        const sprint = await Sprint.findByIdAndUpdate(id,req.body,{new:true}).populate('tasks')
        res.status(200).json(sprint)
    }catch (e) {
        console.log(e);
        res.status(400);
        throw new Error(e);
    }
})


const deleteSprint = asyncHandler(async (req,res)=>{
    try {
        const id = req.params.id;
        await Task.updateMany({sprintId:id},{$unset:{sprintId:""}})
        await Sprint.deleteOne({_id:id})
        res.status(200).json(id)
    }catch (e) {
        console.log(e);
        res.status(400);
        throw new Error(e);
    }
})


const completeSprint = asyncHandler(async (req,res)=>{
    try {
        const id = req.params.id;
        await Sprint.updateOne({_id:id},{$set:{status:"complete"}})
        res.status(200).json(id)
    }catch (e) {
        console.log(e);
        res.status(400);
        throw new Error(e);
    }
})

module.exports = {
    addSprint,
    getSprints,
    pushTaskToSprint,
    deleteTaskFromSprint,
    getSprint,
    editSprint,
    deleteSprint,
    completeSprint
}