module.exports.getTest = (req, res, next) => {
    console.log("API Endpoint 정상 작동")
    res.json('GET request to the test homepage');
}