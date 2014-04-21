var express = require('express');
var ProxyRequest = require('../models/proxy_request');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  //Test object
  ProxyRequest.find({}, function (err, requests) {
         
         //res.send(requests); 
         res.render('index', { title: 'Express', requests:requests }); 
   });

 /* var test = new ProxyRequest({ body: 'Test body' });
  test.save(function (err) {
    if (err) {
      console.log('Error saving ' + err );  
    }
    else {
      res.render('index', { title: 'Express' });

      console.log('Saved');   
    }
  });*/
});

module.exports = router;
