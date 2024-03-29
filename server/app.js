const express = require("express")
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const app = express() 
const https = require("https");
const fs = require("fs")

const certOptions = {
  key: fs.readFileSync("./config/rootca.key"),
  cert: fs.readFileSync("./config/rootca.crt"),
};

const testRoute = require("./routes/test.routes.js")
const ImageButtonRoute = require("./routes/ImageButton.routes.js")
const SelectedImageRoute = require("./routes/SelectedImage.routes.js")
app.use(express.urlencoded({ extended: true }))

const bodyParser = require("body-parser");

const crypto = require('crypto');

// 랜덤한 32바이트의 시크릿 키 생성
const secretKey = crypto.randomBytes(32).toString('hex');
const httpPort = 8000
const httpsPort = 8080
console.log('Secret Key:', secretKey);

// CORS 설정
// const whitelist = ["https://localhost:3000", "http://localhost:8080"];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not Allowed Origin!"));
//     }
//   },
// };

// ngrok 으로 localhost 외부 접속 허용 성공!!! 
const ngrokUrl = 'https://8e51-121-130-212-39.ngrok-free.app'
const koyebUrl = 'https://suhwani-kookmin.koyeb.app'
const netlifyUrl = 'https://main--animated-brigadeiros-7e9e9a.netlify.app'
app.use(cors({
  origin: ['https://localhost:3000', 'http://localhost:3000', ngrokUrl, koyebUrl, netlifyUrl],
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
      secure: true,
      httpOnly: false
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

app.listen(httpPort, () => {
    console.log(`HTTP: http://localhost:${httpPort}`)
})

https.createServer(certOptions, app).listen(httpsPort, () => {
  console.log(`HTTPS: https://localhost:${httpsPort}`);
});