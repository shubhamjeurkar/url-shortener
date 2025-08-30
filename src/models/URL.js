const mongoose = require('mongoose');

const Url = new mongoose.Schema({
 longURL: {
  type: String,
  required: [true, "Please provide long URL"],
  match: [/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/, "Please provide valid URL"]
 },
 code: {
  type: String,
  required: [true, "Please provide code"],
  unique: true
 },
 active: {
  type: Boolean,
  default: true
 }
}, {timestamps: true});

module.exports = mongoose.model("Url", Url);