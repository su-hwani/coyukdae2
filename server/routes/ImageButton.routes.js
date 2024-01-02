const express = require("express")
const router = express.Router()

const ImageButton = require("../controllers/ImageButton.controllers.js")

router.post("/create", ImageButton.create)
router.get("/findOne", ImageButton.findOne)
router.get("/findAll", ImageButton.findAll)
module.exports = router