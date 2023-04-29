var p;
var canvas;
function setup() {
    canvas = createCanvas(WIDTH, HEIGHT);
    p = new Player(200, 200, canvas);
}

function draw() {
    background(20);
    p.tick()
    p.draw();
}

