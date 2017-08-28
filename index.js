const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const users = require('./models/users')

const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require('./src/router')(app, users);

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log("Successfully connected to mongodb server");
});

mongoose.connect('mongodb://localhost/test');

app.listen(port, () => {
  console.log("The Server is now running on " + port + "!");
})
