const { model, Schema } = require("mongoose");

// User object and the fields it has. Ensures the right data type is returned from mongoDB (Mongoose allows this)
const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
});

module.exports = model('User', userSchema)