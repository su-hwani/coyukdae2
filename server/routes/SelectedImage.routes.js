const express = require("express")
const router = express.Router()

const SelectedImage = require("../controllers/SelectedImage.controllers.js")

router.post("/create", SelectedImage.create)
router.get("/findOne", SelectedImage.findOne)
router.get("/findAll", SelectedImage.findAll)
router.post("/insertSelectedImage", SelectedImage.insertSelectedImage)
module.exports = router