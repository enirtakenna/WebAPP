
// 1) establish socket connection

// 2) setup

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
console.log(canvas);
let width = canvas.width;
let height = canvas.height;



// -----------------------------------------------------

let myId = null;
let PHI = (1 + Math.sqrt(5))/2;
let socket = io.connect('/'); // the destination where users get active

socket.on('yourId', function(data){
    myId = data.id;
});

socket.on('update', function(views){
    // clear canvas
    ctx.fillStyle = "white"; // make another #users backgroud-color
    ctx.fillRect(0,0, width, height); // fill the canvas area with its width and height
    let id = 0;
    let hue = 0;

    for (let key in views) {
        let view = views[key];
        ctx.beginPath(); // create a new path for new rectangle
        ctx.arc(view.posX, view.posY / 2, 30, 0, 2 * Math.PI, false); // circle
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.fillStyle = 'white';
        ctx.fill();

        console.log( myId + "   <->   " + view.id );
        if (myId==view.id){
            ctx.strokeStyle = 'darkturquoise';
            ctx.stroke();
        }
        id++;

        console.log( view );
    }

});

