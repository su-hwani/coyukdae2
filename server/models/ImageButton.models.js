const { error } = require("console");
const sql = require("./db.js")
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

class ImageButton {
    constructor(imagebutton) {
        this.ImageUrl = imagebutton.ImageUrl || 'ImageUrl 정보를 추가해주세요.'
        this.ImageName = imagebutton.ImageName || 'ImageName 정보를 추가해주세요.'
    }
}

ImageButton.create = async (newImageButton) => {
    try {
        const res = await query("INSERT INTO ImageButton SET ?", newImageButton)
        if (res) {
            return {err:null, data: {insertId: res.insertId , newImageButton}}
        }
    } catch(err){
        return {err: err, data: null}
    }
};

ImageButton.findByID = async (id)=>{
    try{
        const res = await query('SELECT * FROM ImageButton WHERE id = ?',id)
        if (res.length){
            return {err: null, data: res[0]}
        }
        return {err:"Not Found", data:null}
    }catch(err){
        return {err:err, data:null}
    }
};

ImageButton.findAll = async () =>{
    try{
        const res = await query('SELECT * FROM ImageButton')
        return {err:null, data: res}
    }catch(err){
        return {err:err, data:null}
    }
};

module.exports = ImageButton;