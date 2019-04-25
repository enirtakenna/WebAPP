let io = require('socket.io');

let views = {};
let viewsId = 0;

function ClientState(id){
    this.id = id;
    this.posX = ~~( Math.random()*640 ); //change to inline-block.like instead
    this.posY = ~~( Math.random()*480 ); //change to inline-block.like instead
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
                view.posX += ~~(Math.random()*3)-1;
                view.posY += ~~(Math.random()*3)-1;
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

}
