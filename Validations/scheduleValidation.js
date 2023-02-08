const { body } = require("express-validator")

const scheduleSchema = [
    body('day_start').exists({checkFalsy: true}).isString(),
    body('title').exists({checkFalsy:true}),
    body('important').isBoolean(),
    body('user_id').exists({checkFalsy:true}).isInt()
]



module.exports = {
    scheduleSchema
}