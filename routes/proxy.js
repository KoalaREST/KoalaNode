var express = require('express');
var router = express.Router();
var http = require('http');
var url = require('url');

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
  
  // Sending the desired url
  var target_req = http.request(options, function(target_resp){
    
    // Configuring data: headres
    res.set(target_resp.headers);
    res.statusCode = target_resp.statusCode;

    target_resp.on('data', function(chunk){
      res.write(chunk);
    });
    target_resp.on('end', function () {
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
  


    /*req.on('data', function(chunk){
        console.log("chunk: "+ chunk);

      target_req.write(chunk);
    });
    req.on('end', function () {
      console.log("end");
      console.log("bodyyyyyy: "+ req.rawBody);
      //target_req.end();
    });*/

});



module.exports = router;
