const database = require("../database/databaseConfig.js")
const { body } = require("express-validator")

async function validateRequest(req, resp, next) {
    const {userName} = req.body
    try {
        const userNameExists = await database.one('SELECT userName FROM users WHERE userName = $1 RETURNING *', userName)
        if(userNameExists){
            resp.json({error:"UserName unavailable"})
        }
        else {
            req.body.admin_access = true
            next()
        }
        
    } 
    catch (err) {
       return err
    }

}

const registrationSchema = [
    body('userName').exists({checkFalsy: true}),
    body('password').isLength({min: 5}),
    body('admin_access').isBoolean()
]

module.exports = {
    validateRequest,
    registrationSchema,
}

