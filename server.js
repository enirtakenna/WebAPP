// Mongoose and ToDoList example -> should fit in app.js
var express, app, port, mongoose, Task, bodyParser;
express = require('express');
app = express();
port = process.env.PORT || 3000;
mongoose = require('mongoose');
Task = require('./api/models/todoListModel');
bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://annekatrineegsvang@gmail.com:limpistol37@ds163694.mlab.com:63694/mydb'); // LOOK HERE


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/todoListRoutes'); //importing route
routes(app); //register the route


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);