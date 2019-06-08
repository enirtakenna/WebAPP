let io = require('socket.io');

let views = {};
let viewsId = 0;

function ClientState(id){
    this.id = id;
    //this.posX += 5;
    //this.posY += 10;
}

exports.initialize = function (server) {
    io = io.listen(server);

    io.sockets.on('connection', function(socket) {
        views[ socket.id ] = new ClientState(socket.id);
        socket.emit('yourId',{id:socket.id});
        viewsId++;

        socket.on('disconnect', function() {
            console.log(viewsId + 'Got disconnect!');
            delete views[socket.id];
            viewsId--;
        });

        function updateAllViews(){
            for (let key in views) {
                let view = views[key];
                //view.posX += 5;
                //view.posY += 10;
            }

            if (viewsId>0){
                console.log( viewsId + " connected" );
                socket.broadcast.emit('update',views);
                socket.emit('update',views);
            }
            setTimeout(updateAllViews,5000); // once every 5 seconds
        }
        updateAllViews();
    });

};