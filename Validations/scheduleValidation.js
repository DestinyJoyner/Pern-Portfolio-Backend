const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken")
const { body } = require("express-validator")

const scheduleSchema = [
    body('day_start').exists({checkFalsy: true}).isString(),
    body('title').exists({checkFalsy:true}),
    body('important').isBoolean(),
    body('user_id').exists({checkFalsy:true}).isInt()
]

/* 
    axios.get(API, { 
        headers: 
        {"Authorization" : `Bearer ${token}`} 
    })
    -bearer -> [0], token -> [1] :check if true
*/
// function to check token
function verifyToken(req, resp, next) {
    const header = req.headers['authorization']
    const tokenExist = header && header.split(" ")[1] 
    if(tokenExist){
        // use try catch to catch thrown error from jwt.verify (will return custom error not run the 'else' if use if/else)
        try {
            const verify = jwt.verify(tokenExist, process.env.SECRET_TOKEN)  
        } 
        catch (error) {
            return resp.status(404).json({error: "Invalid token"})   
        }
        next()
    }
    else{
        resp.status(404).json({error: "Token required!"})
    }
}



module.exports = {
    scheduleSchema,
    verifyToken,
}