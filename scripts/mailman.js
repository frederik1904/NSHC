class Mailman {
    constructor(x, y, config) {
        this.x = x;
        this.y = y;
        this.config = config;
    }

    draw(images) {
        push();
        image(images[1], this.x, this.y);
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