
var mongoose = require('mongoose');

// Add models
module.exports = require('./models/proxy_request');

//Connect
mongoose.connect('mongodb://localhost/KoalaNode');

