var express = require("express");
var bodyParser = require("body-parser");
var app = express();


app.use(bodyParser.json());

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


app.listen(3001, function(){
    console.log("server is listening to 3000");
});


app.post("/postJson", function(request, response) {
    console.log(request.body); //This prints the JSON document received (if it is a JSON document)


    /*=== JSON Stuff ===*/
    var jsonfile = require('jsonfile')
    var file = './scene-setup.json'
    var obj = request.body

    jsonfile.writeFile(file, obj, function (err) {
      console.error(err)
  })
});
