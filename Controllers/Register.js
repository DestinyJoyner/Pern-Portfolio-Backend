const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

router.get("/", (req, resp) => {
    resp.json('register')
})



module.exports = router