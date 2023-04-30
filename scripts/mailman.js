class Mailman {
    constructor(x, y, config) {
        this.x = x;
        this.y = y;
        this.config = config;
        this.health = this.config.HEALTH;
    }

    draw(images) {
        push();
        image(images[1], this.x, this.y);

        fill(0);
        const barHeight = 5;
        rect(this.x, this.y + this.config.HEIGHT, this.config.WIDTH, barHeight);

        const hpPercentage = (this.health / this.config.HEALTH);

        fill(255 * (1 - hpPercentage), 255 * hpPercentage, 0);

        rect(this.x, this.y + this.config.HEIGHT, Math.round(this.config.WIDTH * hpPercentage), barHeight);

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

    getDimensions() {
        return {...this.config}
    }

    isDead() {
        return this.health <= 0
    }
}