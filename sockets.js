let io = require('socket.io');

let views = {};
let viewsId = 0;

function ClientState(id){
    this.id = id;
    this.posX = ~~( Math.random()*640 );
    this.posY = ~~( Math.random()*480 );
}

exports.initialize = function (server) {
    io = io.listen(server);

    io.sockets.on('connection', function(socket) {
        views[ socket.id ] = new ClientState(socket.id);
        socket.emit('yourId',{id:socket.id});
        viewsId++;
/*
        socket.on('move', function(data) {
            clientState = views[socket.id];
            clientState.posX = data.x;
            clientState.posY = data.y + (Math.random()*10)-5;
            updateAllViews();
        });
*/
        socket.on('disconnect', function() {
            console.log(viewsId + ' disconnected'); //when disconnecting, the position stays the same for each element, but once you disconnect an element of the first 1+ kind, the colors move one element-'step' forwards. each element should have it's own color attached, also when disconnecting.
            delete views[socket.id];
            viewsId--;
        });

        function updateAllViews(){
            for (let key in views) {
                let view = views[key];
                view.posX += ~~(Math.random()*3)-1;
                view.posY += ~~(Math.random()*3)-1;
            }

            if (viewsId>0){
                console.log( viewsId + " connected" );
                socket.broadcast.emit('update',views);
                socket.emit('update',views);
            }
            setTimeout(updateAllViews,10000); // once every 10 seconds
        }
        updateAllViews();
    });

}
