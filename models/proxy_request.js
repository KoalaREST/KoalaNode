var mongoose = require('mongoose');
var requestSchema = new mongoose.Schema({
  body: String
});
module.exports = mongoose.model('ProxyRequest', requestSchema);
