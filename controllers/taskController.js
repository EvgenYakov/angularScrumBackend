const asyncHandler = require('express-async-handler')
const Task= require('./../models/task')
const User = require('./../models/user')
const Project = require('./../models/project')


const getTasks = asyncHandler(async (req, res)=>{
    try {
        const id = req.params.id;
        const project = await Project.findOne({_id:id}).populate('tasks')
        res.status(200).json(project.tasks)
    }catch (e) {
        console.log(e)
        res.status(400);
        throw new Error(e)
    }
})

const addTask = asyncHandler(async (req, res)=>{
    try {
        const id = req.params.id;
        const {title, description, status, storyPoints} = req.body;
        const task = new Task({title,description,status, storyPoints,projectId:id});
        const project = await Project.findOne({_id:id})
        project.tasks.push(task._id);
        await Project.findByIdAndUpdate(id, project,{new:true})
        await task.save()
        console.log(task)
        res.status(200).json(task)
    }catch (e) {
        res.status(400);
        throw new Error(e)
    }
})

const editTask = asyncHandler(async (req,res)=>{
    try {
        const id=req.params.id;
        const updateTask = await Task.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).json(updateTask)
    }catch (e) {
        res.status(400);
        console.log(e)
        throw new Error(e)
    }
})

const deleteTask = asyncHandler(async (req,res)=>{
    try {
        const id = req.params.id;
        await Task.deleteOne({_id:id})
     //   await Project.findOne({_id:task.projectId})
        res.status(200).json(id)
    }catch (e){
        res.status(400);
        throw new Error("Id does not exists, or req invalid")
    }
})

const changeStatus = asyncHandler(async(req,res)=>{
    try{
        const id = req.params.id;
        const status = req.body.status
        const task = await Task.updateOne({_id:id},{$set:{status}})
        res.status(200).json(id)
    }catch (e) {
        console.log(e)
        res.status(400)
        throw new Error(e)
    }
})

module.exports={
    getTasks,
    addTask,
    editTask,
    deleteTask,
    changeStatus
}
