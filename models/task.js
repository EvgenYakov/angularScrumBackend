const {Schema, model} = require('mongoose')

const taskSchema = Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    status:{
        type:String,
        required: true
    },
    projectId:{
        type: Schema.Types.ObjectId,
        ref:'Project',
        required: true
    },
    sprintId:{
      type:Schema.Types.ObjectId,
        ref:'Sprint',
    },
    storyPoints: Number
})

module.exports = model('Task',taskSchema)