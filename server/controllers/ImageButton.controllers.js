const ImageButton = require("../models/ImageButton.models.js");
const { error } = require("console");
const sql = require("../models/db.js")
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

exports.create = async (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Content can not be empty!"
        });
    };

    const Image = new ImageButton({
        ImageUrl : req.body.ImageUrl || 'ImageUrl',
        ImageName : req.body.ImageName || 'ImageName',
    });

    await ImageButton.create(Image)
    .then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "error ImageButton.controllers.js.23th"
        })
    })
}

exports.findOne = async (req,res)=>{
    const imageId = req.query.id;
    if (!imageId) {
      return res.status(400).send({
        message: "Image ID is missing in the query string."
      });
    }
    
    await ImageButton.findByID(2).then((result)=>{
      if (result.err) {
        if (result.err === "not_found") {
          res.status(404).send({
            message: `Not found Image with id ${req.body.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Image with id " + req.body.id
          });
        }
      } else res.status(200).json(result.data);
    });
};

exports.findAll = async (req,res)=>{
  await ImageButton.findAll().then((result)=>{
    if (result.err)
        res.status(500).send({
          message:
            result.err || "Some error occurred while retrieving users."
        });
      else res.status(200).json(result.data);
    });
};
