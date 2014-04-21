var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url');
var ProxyRequest = require('../models/proxy_request');

/* GET home page. */
router.all('/', function(req, res) {
  
  // Getting the options to send the desired url
  var options = url.parse(req.url.substring(2));
  console.log("method: "+req.method);
  console.log("headers: "+JSON.stringify(req.headers));

  options.method = req.method;
  //options.body = req.body;
  var original_headers = req.headers;
  delete original_headers["host"];
  options.headers = original_headers;

  console.log("options: "+JSON.stringify(options));
  var start_time = Date.now();
  
  // Sending the desired url
  var target_req = http.request(options, function(target_resp){
    
    // Configuring data: headres
    res.set(target_resp.headers);
    res.statusCode = target_resp.statusCode;

    target_resp.on('data', function(chunk){
      res.write(chunk);
    });
    target_resp.on('end', function () {

      console.log("ip: "+req.url.substring(2));
      console.log("date: "+ new Date());
      console.log("statusCode: "+ target_resp.statusCode);
      var time_stop = Date.now();
      console.log("response time "+ (time_stop-start_time) +"ms");
      console.log("body: "+ JSON.stringify(req.body));

      var proxy_request = new ProxyRequest({ 
        url: req.url.substring(2),
        date: new Date(),
        statusCode: target_resp.statusCode,
        responseTime: (time_stop-start_time),
        body: JSON.stringify(req.body) 

      });
      proxy_request.save(function (err) {
        if (err) {
          console.log('Error saving ' + err );  
        }
        else {
         // res.render('index', { title: 'Express' });

          console.log('Saved');   
        }
      });
      res.end();
    });    
  });

  // Do something when the server is not available
  target_req.on("error", function(e){
    console.log("Got error: " + e.message);
    res.render('proxy', { title: 'Koala proxy' });
  });
  
  //Append JSON body  
  var body = JSON.stringify(req.body);
  if (body != "{}") {
    target_req.write(body);
  }  
  target_req.end();
  
});



module.exports = router;
