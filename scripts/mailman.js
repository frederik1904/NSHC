class Mailman {
    constructor(x, y, config) {
        this.x = x;
        this.y = y;
        this.config = config;
        this.health = this.config.HEALTH;
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
        if (this.health <= 0) {
            return;
        }

        let speedAmplifier = deltaTime * this.config.SPEED;
        this.x += speedAmplifier
    }

    hit(damage) {
        this.health = Math.max(this.health - damage, 0);
    }
}