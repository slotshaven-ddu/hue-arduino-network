/*
  A static file server in node.js.
  Put your static content in a directory next to this called client (line 17).
  context: node.js
*/
var express = require('express');              // include the express library
var webserver = express();					           // create a server using express
webserver.listen(8080);                        // listen for HTTP
webserver.use('/',express.static('client'));   // set a static file directory
console.log('Now listening on port 8080 for static files');