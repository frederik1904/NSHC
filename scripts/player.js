class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.x_vel = 0;
        this.y_vel = 0;

        this.width = 20;
        this.height = 30;

        this.gunHeight = 10;

        this.money = 0;

        this.speedAmplifier = ENTITIES.PLAYER.SPEED;
        this.direction = Direction.LEFT;
        this.setupWeapon(WEAPON_NAMES[0])
    }

    draw(images) {
        image(images[0], p.x, p.y);
        this.weapon.draw(this)
        text(`${this.weapon.REMAINING_BULLETS}/${this.weapon.config.MAG_SIZE}`,this.x, this.y);
    }

    tick(enemies) {
        this.move();
        this.weapon.tick(enemies, this);

        return this;
    }

    move() {
        const damp = 0.998;
        this.x_vel *= Math.pow(damp, 1000 / deltaTime);
        this.y_vel *= Math.pow(damp, 1000 / deltaTime);

        let speedAmplifier = deltaTime * this.speedAmplifier

        if (keyIsDown(LEFT_ARROW)) {
            this.x_vel -= speedAmplifier;
        }
        if (keyIsDown(RIGHT_ARROW)) {
            this.x_vel += speedAmplifier;
        }
        if (keyIsDown(UP_ARROW)) {
            this.y_vel -= speedAmplifier;
        }
        if (keyIsDown(DOWN_ARROW)) {
            this.y_vel += speedAmplifier;
        }

        this.x += this.x_vel * deltaTime;
        this.y += this.y_vel * deltaTime;

        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.width > WIDTH) {
            this.x = WIDTH - this.width;
        }
        if (this.y < 0) {
            this.y = 0;
        } else if (this.y + this.height > HEIGHT) {
            this.y = HEIGHT - this.height;
        }
    }

    setupWeapon(name) {
        this.weapon = new Weapon(WEAPONS[name])
    }

    getWeaponHeight() {
        return this.y + this.gunHeight;
    }

    getAmmo() {
        return this.weapon.AMMO;
    }

    withdrawMoney(value) {
        return true;
    }

}