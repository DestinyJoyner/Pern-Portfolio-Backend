
const { body } = require("express-validator")


const registrationSchema = [
    body('userName').exists({checkFalsy: true}).isString({max: 15}),
    body('password').exists({checkFalsy: true}).isLength({min: 5}),
]

module.exports = {
    registrationSchema,
}

