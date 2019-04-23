var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var path = require('path');
var router = express.Router();
var app = express();

const port=process.env.PORT || 3000;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');

    fs.readFile('./views/index.html', null, function(error, data){ //callback function
        if (error){
            res.writeHead(404);
            res.write('File not found!');
        }
        else {
            res.write(data);
        }
        res.end();
    });

});

server.listen(port,() => {
    console.log('Server running at port '+port);
});

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});

router.get('/dashboard',function(req,res){
    res.sendFile(path.join(__dirname+'/dashboard.html'));
});

router.get('/goals',function(req,res){
    res.sendFile(path.join(__dirname+'/goals.html'));
});

//add the router
app.use(express.static(__dirname + '/View'));
app.use('/', router);


module.exports = app;


