const { MongoClient } = require('mongodb');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
// Connecting the server to mongoDB

// MongoClient is the driver that connects to the running MongoDB instance using its URL. It allows us to implement the database-related code in the backend.
const url = process.env.MONGODB_URI ||
'mongodb://localhost:27017/mernSimpleSetup';

MongoClient.connect(url, (err, db)=>{
console.log("Connected successfully to mongodb server")
db.close()
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
