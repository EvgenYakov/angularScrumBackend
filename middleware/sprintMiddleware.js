const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Tokens = require("../models/tokens");
const Sprint = require("../models/sprint");

const checkExp = asyncHandler(async (req,res,next)=>{
        try {
            const sprint = Sprint.findById(req.params.id)
            if (sprint.dateEnd < Date.now()){
                throw new Error("Спринт просрочен")
            }
            if (sprint.status < "complete"){
                throw new Error("Спринт завершен")
            }
            next()
        }catch (e) {
            res.status(400)
            throw new Error()
        }
})

module.exports = {
    checkExp
}