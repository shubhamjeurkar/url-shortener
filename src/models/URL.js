const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
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
 }, 
 ownerId: {
  type: mongoose.Types.ObjectId,
  ref: "User",
  required: true
 },
 expiresAt: {
  type: Date,
  default: null
 }
}, {timestamps: true});

UrlSchema.pre('save', function(next) {
 if( !this.expiresAt ) {
  const now = new Date();
  now.setDate(now.getDate() + 30);
  this.expiresAt = now;
 }
 next();
});

module.exports = mongoose.model("Url", UrlSchema);