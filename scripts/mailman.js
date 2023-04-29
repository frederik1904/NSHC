class Mailman {
    constructor(x, y, config) {
        this.x = x;
        this.y = y;
        this.config = config;
    }

    draw(images) {
        push();
        stroke(255, 255, 255);
        rect(this.x, this.y, 20, 20);
        pop();
    }

    tick() {
        this.move()
        return this;
    }

    move() {
        let speedAmplifier = deltaTime * this.config.SPEED;

        this.x += speedAmplifier

    }
}