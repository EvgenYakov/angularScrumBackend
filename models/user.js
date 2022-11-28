const {Schema, model} = require('mongoose')

const userSchema = Schema(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required: true,
            unique:true
        },
        tasks:[
            {
                type: Schema.Types.ObjectId,
                ref:'Task',
                required:true
            }
        ]
    }
)

module.exports = model('User', userSchema)