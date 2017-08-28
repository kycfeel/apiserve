const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String
})

module.exports = mongoose.model('users', userSchema, "users");
