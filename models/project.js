const {Schema, model} = require('mongoose')

const projectSchema = Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type: Date,
        required: true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    tags: String,
    tasks:[
        {
            type: Schema.Types.ObjectId,
            ref:'Task',
            required:true
        }
    ],
    sprints:[
        {
            type:Schema.Types.ObjectId,
            ref:'Sprint',
            required:true
        }
     ]
})

module.exports = model('Project',projectSchema)