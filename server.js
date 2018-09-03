var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    port = 8080,
    myUrl = 'http://localhost:8080';

/* Global variables */
var listingData, server;



server = http.createServer(function(request, response) {
  var parsedUrl = url.parse(request.url, true);
  var myUrlParsed = url.parse(myUrl, true);
  /*
    Your request handler should send listingData in the JSON format if a GET request
    is sent to the '/listings' path. Otherwise, it should send a 404 error. */
    // get pathname
  var path = parsedUrl.pathname;
  console.log("Sever listening on " +  myUrlParsed.protocol + myUrlParsed.host + path);
  if (path == '/listings') {
    response.writeHead(200, {'Content-Type' : 'application/json'});
    // return listingData in JSON format
    return response.end(JSON.stringify(listingData));
  }
  // Any other pathname throw a 404 error
  if (path != '/listings') {
    response.writeHead(404, {'Content-Type' : 'text/html'});
    return response.end("Bad gateway error")
  }
}).listen(port);

fs.readFile('listings.json', 'utf8', function(err, data) {
  /*
    This callback function should save the data in the listingData variable,
    then start the server.
   */
   if (err) throw err;
   listingData = JSON.parse(data);
});
