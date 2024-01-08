const { error } = require("console");
const sql = require("./db.js")
const util = require('util');
const query = util.promisify(sql.query).bind(sql);

class SelectedImage {
    constructor(SelectedImage) {
        if (SelectedImage && SelectedImage.sessionID) {
            this.sessionID = SelectedImage.sessionID;
            this.Round_32 = SelectedImage.Round_32 || null;
            this.Round_16 = SelectedImage.Round_16 || null;
            this.Round_8 = SelectedImage.Round_8 || null;
            this.Round_4 = SelectedImage.Round_4 || null;
            this.Round_2 = SelectedImage.Round_2 || null;
        }
    }
}


SelectedImage.create = async (newSelectedImage) => {
    try {
        // query 함수가 Promise를 반환하도록 하고, 템플릿 리터럴로 쿼리 작성
        const res = await query(`INSERT INTO SelectedImage SET ?`, newSelectedImage);
        // query 함수가 에러 없이 실행되었을 때
        return { err: null, data: { insertId: res.insertId, newSelectedImage } };
    } catch (err) {
        // query 함수가 에러를 던졌을 때
        console.error('Error in SelectedImage.create:', err);
        return { err, data: null };
    }
};

SelectedImage.findColumn = async (column)=>{
    try{
        const querystring = `SELECT ${column}, COUNT(*) AS count_of_${column} FROM selectedimage WHERE ${column} IS NOT NULL GROUP BY ${column}`
        const res = await query(querystring);
        if (res.length){
            return {err: null, data: res}
        }
        return {err:"Not Found", data:null}
    }catch(err){
        return {err:err, data:null}
    }
};

SelectedImage.findBySession = async (sessionID)=>{
    try{
        const res = await query('SELECT * FROM selectedimage WHERE sessionid = ?',sessionID)
        if (res.length){
            return {err: null, data: res[0]}
        }
        return {err:"Not Found", data:null}
    }catch(err){
        return {err:err, data:null}
    }
};

SelectedImage.findByID = async (id)=>{
    try{
        const res = await query('SELECT * FROM selectedimage WHERE id = ?',id)
        if (res.length){
            return {err: null, data: res[0]}
        }
        return {err:"Not Found", data:null}
    }catch(err){
        return {err:err, data:null}
    }
};

SelectedImage.findAll = async () =>{
    try{
        const res = await query('SELECT * FROM selectedimage')
        return {err:null, data: res}
    }catch(err){
        return {err:err, data:null}
    }
};

SelectedImage.updateAttribute = async (sessionID, attributeName, attributeValue) => {
    try {
        const res = await query(`UPDATE SelectedImage SET ${attributeName} = ? WHERE SessionID = ?`, [attributeValue, sessionID]);

        if (res && res.affectedRows !== undefined && res.affectedRows > 0) {
            // 쿼리가 성공적으로 실행됐을 때
            
            return { err: null, data: { affectedRows: res.affectedRows } };
        } else {
            // 쿼리 실행 중 에러 발생 또는 영향을 받은 행이 없을 때
            const error = new Error('Query execution failed or no rows affected.');
            error.details = res; // 여기에 더 자세한 내용을 추가할 수 있습니다.
            throw error;
        }
    } catch (err) {
        // query 함수가 에러를 던졌을 때
        console.error('Error in SelectedImage.updateAttribute:', err);
        return { err, data: null };
    }
};


module.exports = SelectedImage;