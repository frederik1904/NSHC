var p;
var canvas;
var backgroundImage;
var backgroundBuffer;
var images = [];
var enemies = [];
var gameTimer = 0;
var shop = new Shop();
var enemySpawnTime = [500, 2500, 3000, 5000, 5400, 6000, 7000, 10000, 10500, 15000, 16000, 17000, 20000, 25000, 27000]
var enemySpawnTime2 = [500, 2500, 3000, 5000, 5400, 6000, 7000, 10000, 10500, 15000, 16000, 17000, 20000, 25000, 27000]
var msPerLevel = 60 * 1000;
var maxLevel = 4;

function preload() {
    backgroundImage = loadImage('assets/background.png');
}

function setup() {
    canvas = createCanvas(WIDTH, HEIGHT);
    p = new Player(200, 200, ENTITIES.PLAYER);

    images.push(loadImage('assets/man.png'));
    images.push(loadImage('assets/man2.png'));
    images.push(loadImage('assets/box1.png'));
    images.push(loadImage('assets/box2.png'));
    images.push(loadImage('assets/bike.png'));

    backgroundBuffer = createGraphics(WIDTH, HEIGHT);
    backgroundBuffer.image(backgroundImage, 0, 0, WIDTH, HEIGHT)
}

function draw() {
    gameTimer += deltaTime;

    while (enemySpawnTime.length > 0 && gameTimer >= enemySpawnTime[0]) {
        enemySpawnTime.shift();
        enemies.push(new Mailman(-20, random(60, 550), ENTITIES.STD));
    }
    while (enemySpawnTime2.length > 0 && gameTimer >= enemySpawnTime2[0]) {
        enemySpawnTime2.shift();
        enemies.push(new Mailman(-20, random(60, 550), ENTITIES.BIKE));
    }

    background(0);
    image(backgroundBuffer, 0, 0, WIDTH, HEIGHT)

    shop.tick(p)

    p.tick(enemies);

    enemies.filter(e => e.isDead())
        .forEach(enemy => {
            backgroundBuffer.image(images[2 + Math.round(random(0, 1))], enemy.x + enemy.config.WIDTH / 2, enemy.y + enemy.config.HEIGHT);
        })
    enemies = enemies.filter(e => !e.isDead())

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].tick();
    }

    // Draw
    drawGame();
    drawUI();
}

function drawGame() {
    enemies.sort((a,b) => a.y - b.y);
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw(images);
    }
    p.draw(images)
}

function getCurrentLevel() {
    return Math.min(1 + Math.floor(gameTimer / msPerLevel), maxLevel);
}

function getCurrentLevelProgress() {
    if (getCurrentLevel() === maxLevel) {
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

    text(p.money + ' $', WIDTH - 10, 50);
    text(`AMMO: ${p.getAmmo()}`, WIDTH - 10, 70);

    shop.draw();
}

document.getElementB