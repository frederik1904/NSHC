var p;
var canvas;
var backgroundImage;
var backgroundBuffer;
var images = [];
var enemies = [];
var gameTimer = 0;

var enemySpawnTime = [500, 2500, 3000, 5000, 5400, 6000, 7000, 10000, 10500]
var msPerLevel = 60 * 1000;
var maxLevel = 4;

function preload() {
    backgroundImage = loadImage(i_background);
}

function setup() {
    canvas = createCanvas(WIDTH, HEIGHT);
    p = new Player(200, 200, ENTITIES.PLAYER);

    images.push(loadImage(i_player));
    images.push(loadImage(i_enemy));

    backgroundBuffer = createGraphics(WIDTH, HEIGHT);
    backgroundBuffer.image(backgroundImage, 0, 0, WIDTH, HEIGHT)
}

function draw() {
    gameTimer += deltaTime;

    while (enemySpawnTime.length > 0 && gameTimer >= enemySpawnTime[0]) {
        enemySpawnTime.shift();
        enemies.push(new Mailman(-10, random(20, 580), ENTITIES.STD));
    }

    background(0);
    image(backgroundBuffer, 0, 0, WIDTH, HEIGHT)

    // Tick
    p.tick(enemies);
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].tick();
    }

    // Draw
    drawGame();
    drawUI();
}

function drawGame() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw(images);
    }
    p.draw(images)
}

function getCurrentLevel() {
    return Math.min(1 + Math.floor(gameTimer / msPerLevel), maxLevel);
}

function getCurrentLevelProgress() {
    if (getCurrentLevel() == maxLevel) {
        return 1;
    }
    return gameTimer / msPerLevel % 1;
}

function drawUI() {
    stroke(0)
    // Level
    let levelHeight = 30;
    let levelBarBorder = 4;

    fill(30);
    rect(0, 0, WIDTH, levelHeight);
    fill(200, 140, 50);
    rect(levelBarBorder, levelBarBorder, getCurrentLevelProgress() * (WIDTH - levelBarBorder * 2), levelHeight - levelBarBorder * 2);

    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    textSize(24 + (4 + getCurrentLevel()) * Math.sin(gameTimer / (5000 / (getCurrentLevel() + 2))));
    fill(255);
    text('LEVEL ' + getCurrentLevel(), WIDTH / 2, 1 + levelHeight / 2);

    // Money
    textAlign(RIGHT, CENTER);
    textStyle(BOLD);
    textSize(14);
    fill(255);

    text('10$', WIDTH - 10, 50);
    text(`AMMO: ${p.getAmmo()}`, WIDTH - 10, 70);
}

document.getElementB