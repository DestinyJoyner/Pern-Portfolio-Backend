const { body } = require("express-validator")
const { getUserId } = require("../Queries/login-queries.js")

const scheduleSchema = [
    body('day_start').exists({checkFalsy: true}).isString(),
    body('title').exists({checkFalsy:true}),
    body('important').isBoolean(),
    body('user_id').exists({checkFalsy:true}).isInt()
]

// function to check user authorization for each schedule route
async function scheduleUserCheck(req, resp, next) {
    const { userId, credentials } = req.query
    const verifiedUser = await getUserId(userId)

    if(verifiedUser.id === +userId && verifiedUser.password === credentials){
        next ()
    }
    else {
        resp.status(500).json({error: " Authorization Required"})
    }
}



module.exports = {
    scheduleSchema,
    scheduleUserCheck
}