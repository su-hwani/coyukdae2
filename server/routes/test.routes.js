const express = require("express")
const router = express.Router()

const test = require("../controllers/test.controllers.js")

router.get("/", test.getTest)

module.exports = router