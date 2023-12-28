const express = require("express")
const router = express.Router()

const ImageButton = require("../controllers/ImageButton.controllers.js")

router.post("/create", ImageButton.create)
router.get("/get", ImageButton.findOne)

module.exports = router