var p;
var canvas;
var backgroundImage;
var images = [];
var enemies = [];

function setup() {
    canvas = createCanvas(WIDTH, HEIGHT);
    p = new Player(200, 200);
    backgroundImage = loadImage(i_background);

    images.push(loadImage(i_player));
    images.push(loadImage(i_enemy));

    enemies.push(new Mailman(-10, random(20,580), MAILMAN.STD))
}

function draw() {
    image(backgroundImage, 0, 0);
    // Tick
    p.tick(enemies);
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].tick();
    }

    // Draw
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw(images);
    }
    p.draw(images)
}

