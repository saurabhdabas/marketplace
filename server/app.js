const config = require('./config/config')
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// Connecting the server to mongoDB

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri,
  { useNewUrlParser: true,
    useUnifiedTopology: true 
  }
)
.then(() => console.log("Database connected!"))
.catch(err => console.log(err));

app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
