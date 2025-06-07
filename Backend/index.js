
const express = require('express');
const cors = require("cors");
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const fileUpload = require('express-fileupload');
const xss = require("xss-clean");
const helmet = require("helmet");
const hpp = require("hpp");


const app = express();

app.use(express.json());
app.set('trust proxy', 1);


app.use(cookieParser());


app.use(helmet());
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     scriptSrc: ["'self'", "https://trusted.cdn.com"],
//     objectSrc: ["'none'"],
//     upgradeInsecureRequests: [],
//   },
// }));



app.use(xss());


app.use(hpp());


app.use(cors({
  origin: [
    "https://new-cccc.vercel.app",
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://www.cccakgec.live"
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './uploads',
}));


const routes = require("./routes/Routes");
app.use("/api/v1" ,routes);


const database = require('./config/database');
database();


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Project successfully running on ${PORT}`);
});
