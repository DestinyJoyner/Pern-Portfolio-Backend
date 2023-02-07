const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()

router.get("/", (req, resp) => {
    resp.json({token: "test123"})
})

router.post("/", (req, resp) => {
    resp.json("login")
})


module.exports = router