const mongoose = require('mongoose')

MONGO_URI = "mongodb+srv://evgen:aUAqEDC8PmmgW6rE@cluster1.agwws.mongodb.net/scrum?retryWrites=true&w=majority"

const connectDB = async ()=>{
    try {
        const conn = await mongoose.connect(MONGO_URI,{useNewUrlParser:true})
        console.log(`MongoDB Conected: ${conn}`)
    }catch (e){
        console.log(e.message)
    }
}

module.exports = connectDB