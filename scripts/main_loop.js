var p;
var canvas;
var backgroundImage;
var images = [];

function setup() {
    canvas = createCanvas(WIDTH, HEIGHT);
    p = new Player(200, 200);
    backgroundImage = loadImage(i_background);
    images[0] = loadImage(i_player);
    images[1] = loadImage(i_enemy);
}

function draw() {
    image(backgroundImage, 0, 0);
    p.tick()
    p.draw(images);
    textSize(32);
    fill(0)
    text(round(1000/deltaTime*100)/100, 10, 50)
}

