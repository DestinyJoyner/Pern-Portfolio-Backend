const { body } = require("express-validator")

const loginSchema = [
    body('userName').exists({checkFalsy: true}),
    body('password').isLength({min: 5})
]


module.exports = {
    loginSchema
}