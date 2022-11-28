const {Schema, model} = require('mongoose')

const sprintSchema= Schema({
    title: {
        type:String,
        required:true
    },
    dateStart: {
        type:Date,
        required:true
    },
    dateEnd:{
        type:Date,
        required: true
    },
    status:{
        type:"string",
        required:true
    },
    projectId:{
        type:Schema.Types.ObjectId,
        ref:'Project',
        required:true
    },
    tasks:[{
        type:Schema.Types.ObjectId,
        ref:'Task',
        required:true
    }]
})

sprintSchema.methods.removeFromTasks = function (id){
 let tasks = [...this.tasks]
    this.tasks = tasks.filter((task)=>task._id.toString()===id.toString())
    return this.save()
}

module.exports = model("Sprint", sprintSchema)