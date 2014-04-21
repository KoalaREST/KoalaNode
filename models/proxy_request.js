var mongoose = require('mongoose');
var requestSchema = new mongoose.Schema({
  url: String,
  date: Date,
  statusCode: Number,
  responseTime: Number,
  body: String
});
module.exports = mongoose.model('ProxyRequest', requestSchema);
