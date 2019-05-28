
/*  This is creating the elements for users online/offline activity */

// 1) establish socket connection

// 2) setup


let users = document.getElementById('users'); // where in the doc the circles go
let ctx = users.getContext('2d');
let width = users.width;
let height= users.height;

// -----------------------------------------------------

let myId = null;
let PHI = (1 + Math.sqrt(5))/2;
let socket = io.connect('/'); // Where users get active

socket.on('yourId', function(data){
    myId = data.id;
    console.log( 'got my id = ' + myId);
});

socket.on('update', function(views){
    // clear canvas
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0,0, width, height); // fill the canves area with its width and height
    let id = 0;
    let hue = 0;
    console.log( '--------------' );
    for (let key in views) {
        let view = views[key];
        ctx.beginPath(); // create a new path for new rectangle
        ctx.arc(view.posX, view.posY / 2, 20, 0, 2 * Math.PI, false); // circle
        ctx.lineWidth = 2;
        ctx.strokeStyle = "white";
        ctx.stroke();

        /* based on:
           http://stackoverflow.com/questions/1168260/algorithm-for-generating-unique-colors
        */
        hue = ~~( (id * PHI - ~~(id * PHI)) * 256);
        ctx.fillStyle = 'hsl(' + hue + ', 80%, 70%)';
        ctx.fill();

        console.log( myId + "   <->   " + view.id );
        if (myId==view.id){
            ctx.strokeStyle = 'white';
            ctx.stroke();
        }
        id++;

        console.log( view );
    }
    console.log( '--------------' );
});
