const express = require("express")
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express() 
const port = 8080

const testRoute = require("./routes/test.routes.js")
const ImageButtonRoute = require("./routes/ImageButton.routes.js")
const SelectedImageRoute = require("./routes/SelectedImage.routes.js")

const bodyParser = require("body-parser");

const crypto = require('crypto');

// 랜덤한 32바이트의 시크릿 키 생성
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Secret Key:', secretKey);

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
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
  session({
    secret: secretKey, // 세션을 암호화하는 데 사용되는 키
    resave: false,
    saveUninitialized: true,
    cookie: { 
      maxAge: 360000, //1분=60000, 1시간=360000
      secure: false,
      httpOnly: true
     } // HTTPS를 사용하지 않을 경우 false
  })
);

// Routing 
app.get('/', (req, res) => {
  console.log(req.sessionID)
  res.json('Hello World!')
})

app.use("/test", testRoute)
app.use("/ImageButton", ImageButtonRoute)
app.use("/SelectedImage", SelectedImageRoute)

app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}!`)
})