const SelectedImage = require("../models/SelectedImage.models.js");
const { error } = require("console");
const sql = require("../models/db.js")
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

exports.create = async (req, res) => {
    try {
        if (!req.body || req.sessionID) {
            throw { status: 400, message: "Content can not be empty!" };
        }

        const newSelectedImage = new SelectedImage({
            sessionID: req.sessionID,
            Round_32: req.body.Round_32 || 'Round_32',
            Round_16: req.body.Round_16 || 'Round_16',
            Round_8: req.body.Round_8 || 'Round_8',
            Round_4: req.body.Round_4 || 'Round_4',
            Round_2: req.body.Round_2 || 'Round_2',
        });

        const result = await SelectedImage.create(newSelectedImage);
        res.status(200).json(result);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422).send({
                message: "Validation error. Please check your input data."
            });
        } else {
            const status = error.status || 500;
            const message = error.message || "Error in ImageButton.controllers.js.23rd";
            res.status(status).send({ message });
        }
    }
};


exports.findOne = async (req,res)=>{
    const SessionID = req.sessionID;
    if (!SessionID) {
      return res.status(400).send({
        message: "Session is missing."
      });
    }
    
    await SelectedImage.findBySession(SessionID).then((result)=>{
      if (result.err) {
        if (result.err === "not_found") {
          res.status(404).send({
            message: `Not found Image with id .`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Image with id " 
          });
        }
      } else res.status(200).json(result.data);
    });
};

exports.findAll = async (req,res)=>{
  await SelectedImage.findAll().then((result)=>{
    if (result.err)
        res.status(500).send({
          message:
            result.err || "Some error occurred while retrieving users."
        });
      else res.status(200).json(result.data);
    });
};

exports.findColumn = async (req,res)=>{
    const sessionid = req.cookies.sessionID
    if (!sessionid) {
        req.cookies.sessionID = req.sessionID
    }
    
    const column = req.query.column
    await SelectedImage.findColumn(column).then((result)=>{
      if (result.err)
          res.status(500).send({
            message:
              result.err || "Some error occurred while retrieving users."
          });
        else res.status(200).json(result.data);
      });
  };


exports.insertSelectedImage = async (req, res) => {
    try {
        let sessionID = req.cookies.sessionID
        if (!sessionID) {
            sessionID = req.sessionID
            req.session.sessionID = sessionID
        }

        const SelectedImageIdCurrent = req.body.selectedImageId; 
        const SelectedImageIdCurrent_join = SelectedImageIdCurrent.join(',')

        // SessionID를 기준으로 데이터베이스에서 레코드 검색
        let existingRecord = await SelectedImage.findBySession(sessionID); 
        existingRecord = existingRecord.data

        if (!existingRecord) { 
            // 해당 SessionID를 가진 레코드가 없으면 오류 응답
            const newSelectedImage = new SelectedImage({
                sessionID: sessionID
            });
            existingRecord = await SelectedImage.create(newSelectedImage);
        }

        // 이미지 ID에 따라 필드 업데이트
        switch (SelectedImageIdCurrent.length) {
            case 16:
                existingRecord = await SelectedImage.updateAttribute(sessionID, "Round_32", SelectedImageIdCurrent_join)
                break;
            case 8:
                existingRecord = await SelectedImage.updateAttribute(sessionID, "Round_16", SelectedImageIdCurrent_join)
                break;
            case 4:
                existingRecord = await SelectedImage.updateAttribute(sessionID, "Round_8", SelectedImageIdCurrent_join)
                break;
            case 2:
                existingRecord = await SelectedImage.updateAttribute(sessionID, "Round_4", SelectedImageIdCurrent_join)
                break;
            case 1:
                existingRecord = await SelectedImage.updateAttribute(sessionID, "Round_2", SelectedImageIdCurrent_join)
                break;
            default:
                return res.status(400).send({
                    message: "Invalid length of SelectedImageIdCurrent."
                });
        }
    
        // 성공적인 응답
        res.status(200).json(existingRecord);
    } catch (error) {
        console.error('Error in updateAValue:', error);
        res.status(500).send({
            message: error.message || "Error updating A value."
        });
    }
}