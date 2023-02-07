const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

app.use("/login", require("./Controllers/Login.js"))
app.use("/register", require("./Controllers/Register.js"))

app.get("/", (req, resp) => {
    resp.status(200).send("<h1>Portfolio Server</h1>")
})

app.get("*", (req, resp) => {
    resp.status(404).json({error: "Page Not Found"})
})


module.exports = app