const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const port = 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', require('./src/router.js'));

app.listen(port, () => {
  console.log("The Server is now running on " + port + "!");
})
