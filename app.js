const http = require('http');
const fs = require('fs');
const url = require('url');
const port=process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    fs.readFile('./index.html', null, function(error, data){
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

// PATHS
function renderHTML(path, res){
    fs.readFile(path, null, function(error, data){
        if (error){
            res.writheHead(404);
            res.write("File not found!");
        } else {
            res.write(data);
        }
        res.end();
    });
};

module.exports = {
    handleRequest: function(req, res){
        res.writheHead(200, {'Content-Type': 'text/html'});

        var path = url.parse(req.url).pathname;
        switch (path) {
            case '/':
                renderHTML('./indexhtml', res);
                break;
            case '/login':
                renderHTML('./login/index.html', res);
                break;
            case '/addContact':
                renderHTML('./addContact/index.html', res);
                break;
        }
    }
}