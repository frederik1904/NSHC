var p;
var canvas;
var backgroundImage;
var backgroundBuffer;
var images = [];
var enemies = [];
var gameTimer = 0;
var shop = new Shop();
var enemySpawnTime = [
    500, 5000, 10000, 14000, 17000, 20000, 21000, 25000, 27000, 29000, 30000, 32000, 32500, 34000, 35000, 40000, 41000, 42000, 43000, 44000,
    50000, 50000, 50000, 50000, 50000, 50000, 55000, 59000, 60000, 62000, 67000, 70000, 70000, 70000, 70000, 71000, 80000, 82000, 86500, 88500, 92500, 95500,
    100000, 104000, 104000, 104000, 108000, 108000, 108000, 112000, 112000, 112000, 116000, 116000, 116000, 120000, 120000, 120000, 124000, 124000, 124000, 128000, 128000, 128000, 132000, 132000, 132000, 136000, 136000, 136000, 140000, 140000, 140000, 140000
]
var enemySpawnTime2 = [65000, 75000, 80000, 90000, 94000, 110000, 120000, 140000]
var enemySpawnTime3 = [130000]
var msPerLevel = 50 * 1000;
var maxLevel = 4;
var levelHeight = 30;
var levelBarBorder = 4;
var translateAmount = levelHeight;
var gameOver = false;

function preload() {
    backgroundImage = loadImage('assets/background.png');
}

function setup() {
    canvas = createCanvas(WIDTH, HEIGHT + levelHeight + 30);
    p = new Player(WIDTH - 100, HEIGHT / 2, ENTITIES.PLAYER);

    images.push(loadImage('assets/man.png'));
    images.push(loadImage('assets/man2.png'));
    images.push(loadImage('assets/box1.png'));
    images.push(loadImage('assets/box2.png'));
    images.push(loadImage('assets/bike.png'));
    images.push(loadImage('assets/car.png'));

    backgroundBuffer = createGraphics(WIDTH, HEIGHT);
    backgroundBuffer.image(backgroundImage, 0, 0, WIDTH, HEIGHT)
}

function draw() {
    if (!gameOver) {
        gameTimer += deltaTime;
    }

    while (enemySpawnTime.length > 0 && gameTimer >= enemySpawnTime[0]) {
        enemySpawnTime.shift();
        enemies.push(new Mailman(-20, random(60, 550), ENTITIES.STD));
    }
    while (enemySpawnTime2.length > 0 && gameTimer >= enemySpawnTime2[0]) {
        enemySpawnTime2.shift();
        enemies.push(new Mailman(-30, random(150, 450), ENTITIES.BIKE));
    }
    while (enemySpawnTime3.length > 0 && gameTimer >= enemySpawnTime3[0]) {
        enemySpawnTime3.shift();
        enemies.push(new Mailman(-40, HEIGHT / 2, ENTITIES.CAR));
    }


    shop.tick(p)

    p.tick(enemies);

    enemies.filter(e => e.isDead())
        .forEach(enemy => {
            backgroundBuffer.image(images[2 + Math.round(random(0, 1))], enemy.x, enemy.y + enemy.config.HEIGHT);
        })
    enemies = enemies.filter(e => !e.isDead())

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].tick();
    }

    // Draw
    push()
    translate(0, translateAmount);
    background(100);
    image(backgroundBuffer, 0, 0, WIDTH, HEIGHT)
    drawGame();
    pop();
    drawUI();
}

function drawGame() {
    enemies.sort((a, b) => a.y - b.y);
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw(images);
    }
    p.draw(images)
}

function getCurrentLevel() {
    return Math.min(3, Math.min(1 + Math.floor(gameTimer / msPerLevel), maxLevel));
}

function getCurrentLevelProgress() {
    if (Math.floor(gameTimer / msPerLevel) > maxLevel - 2) {
        return 1;
    }
    return gameTimer / msPerLevel % 1;
}

function drawUI() {
    stroke(0)
    // Level
    fill(0);
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
    textSize(18);
    fill(255);

    text(p.money + ' $', WIDTH - 10, 50);
    text(`Clips: ${p.getClips()}`, WIDTH - 10, 70);

    if (enemies.length == 0 && gameTimer > 150000 && !gameOver) {
        push();
        stroke(100, 150, 250)
        textSize(150);
        fill(100, 150, 250);
        textAlign(CENTER, CENTER);
        text('You won!', WIDTH / 2, HEIGHT / 2);
        pop();
    } else if (gameOver) {
        push();
        stroke(250, 50, 50)
        textSize(150);
        fill(250, 50, 50);
        textAlign(CENTER, CENTER);
        text('You lost!', WIDTH / 2, HEIGHT / 2);
        textSize(30);
        text('Reload the page to try again', WIDTH / 2, HEIGHT / 2 + 100);
        pop();
    }


    shop.draw();
}