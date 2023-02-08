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

// GET ONE DATE ROUTE
router.get("/:date", async (req, resp) => {
    const { date } = req.params
    const thisDate = await getOneDate(date)
    thisDate.cal_date ?
    resp.status(200).json(thisDate) :
    resp.status(500).json("Date not found")
})



module.exports = router