class Player {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.speedAmplifier = 0.5;

        this.direction = Direction.LEFT;

        this.bullet = {x: -10, y: -10}

        // canvas.mousePressed(this.shoot)
    }

    draw(images) {
        // Draw player
        push();
        fill(255, 0, 255);
        rect(p.x, p.y, 20, 20);
        pop();

        // Draw bullet
        if (this.bullet.x && this.bullet.y) {
            push();
            fill(0, 255, 255);
            stroke(255,255,255);
            line(this.x, this.y, 0, this.y);
            pop();
        }

    }

    tick() {
        this.move()
        this.shoot()
    }

    move() {
        let speedAmplifier = deltaTime * this.speedAmplifier

        if (keyIsDown(LEFT_ARROW)) {
            this.x -= speedAmplifier;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.x += speedAmplifier;
        }
        if (keyIsDown(UP_ARROW)) {
            this.y -= speedAmplifier;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.y += speedAmplifier;
        }
    }

    shoot() {
        if (keyIsDown(32)) {
            this.bullet.x = mouseX;
            this.bullet.y = mouseY;
        }
    }
}