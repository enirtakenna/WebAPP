var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
const app = express();
const port=process.env.PORT || 3000;

// SERVER
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('./views/index.html', null, function(error, data){
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


