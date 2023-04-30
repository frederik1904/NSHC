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
        push();
        backgroundBuffer.stroke(255, 0, 0, 20);
        backgroundBuffer.strokeWeight(4);

        let midx = this.x + this.config.WIDTH / 2;
        let midy = this.y + this.config.HEIGHT;
        let size = 10;

        for (let i = 1; i < 20; i++) {
            backgroundBuffer.line(random(midx - size, midx + size), random(midy - size, midy + size), random(midx - size, midx + size), random(midy - size, midy + size));
        }
        this.health = Math.max(this.health - damage, 0);
        pop();
    }

    getDimensions() {
        return { ...this.config }
    }
}