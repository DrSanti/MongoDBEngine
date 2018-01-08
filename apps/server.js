var express = require("express");
var app     = express();
var path    = require("path");
var engine    = require("../libs/MDBEngine");

//https://stackoverflow.com/questions/29357305/nodejs-express-include-local-js-file

//!! first parameter is the mount point, 
//!! second is the location in the file system
app.use("/public", express.static(__dirname + "/public"));



app.get('/',function(request, response){
  response.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/home',function(request, response){
  response.sendFile(path.join(__dirname+'/index.html'));
});

/**
 * GET request
 */
app.get('/getlast',function(request, response){
  //response.sendFile(path.join(__dirname+'/table-view.html'));



//   var json = [
//     {
//       name: 'hello',
//       value: '123.456'
//     },
//     {
//       name: 'world',
//       value: '839.383'
//     }
// ];
// var i = 1;
//   console.log(json[1]['name']);



  engine.connect()
    .then( () => {
      return engine.getLast();
    })
    .then( (data) => {
      //var str = JSON.stringify(data);
      response.send(data);
    })
    .then( (data) => {
      return engine.close();
    })
});

/*
app.get('/about',function(request,response){
  response.sendFile(path.join(__dirname+'/about.html'));
});

app.get('/sitemap',function(request,response){response
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});
*/


app.listen(9500);

console.log("Running at Port 9500");