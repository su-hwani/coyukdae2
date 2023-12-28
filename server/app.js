const express = require("express")
const cors = require('cors')
const app = express() 
const port = 8080

const testRoute = require("./routes/test.routes.js")
const ImageButtonRoute = require("./routes/ImageButton.routes.js")
const bodyParser = require("body-parser");


// CORS 설정
const whitelist = ["http://localhost:3000", "http://localhost:8080"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed Origin!"));
    }
  },
};
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routing 
app.get('/', (req, res) => {
    res.json('Hello World!')
})

app.use("/test", testRoute)
app.use("/ImageButton", ImageButtonRoute)

app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}!`)
})