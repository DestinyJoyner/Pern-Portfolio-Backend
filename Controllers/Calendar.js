const express = require("express")
const router = express.Router()
const { getAllDates, getOneDate } = require("../Queries/calendar-queries.js")

// GET ALL DATES FROM GENERATED CALENDAR
router.get("/", async (req, resp) => {
    const allDates = await getAllDates()

    allDates[0] ?
    resp.status(200).json(allDates) :
    resp.status(200).json("No Dates Available")
})



module.exports = router