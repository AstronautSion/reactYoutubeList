const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const musicRouter = require('./routes/music');
const userRouter = require('./routes/user');
const db = require('./models');
const passportConfig = require('./passport');

dotenv.config();
const app = express();
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session());
app.use(passport.initialize());
app.use(passport.session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET,
}));

app.use('/music',musicRouter);
app.use('/user', userRouter);


app.listen(3065, () => {
  console.log('서버 실행 중');
});