class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.x_vel = 0;
        this.y_vel = 0;

        this.width = 20;
        this.height = 30;

        this.gunHeight = -10;

        this.speedAmplifier = 0.0012;
        this.direction = Direction.LEFT;
        this.setupWeapon(WEAPON_NAMES[0])
    }

    draw(images) {
        image(images[0], p.x, p.y);

        if (this.weapon.LAST_SHOT + this.weapon.DRAW_TIME > Date.now()) {
            this.weapon.DRAW(this)
        }
    }

    tick(enemies) {
        this.move()
        this.handleWeapon(enemies)

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

    handleWeapon(enemies) {
        if (keyIsDown(32) && this.canShoot()) {
            this.weapon.REMAINING_BULLETS -= 1;
            this.weapon.NEXT_ALLOWED_ACTION_TIME = Date.now() + this.weapon.COOLDOWN;
            this.weapon.LAST_SHOT = Date.now();
            this.detectHits(enemies)
        }

        if (keyIsDown(82) && this.canWeaponAction()) {
            this.reload();
        }
    }

    canShoot() {
        return this.weapon.REMAINING_BULLETS > 0 && this.canWeaponAction();
    }

    canWeaponAction() {
        return this.weapon.NEXT_ALLOWED_ACTION_TIME === undefined
            || this.weapon.NEXT_ALLOWED_ACTION_TIME < Date.now();
    }

    setupWeapon(name) {
        const referenceWeapon = WEAPONS[name];

        this.weapon = {
            ...referenceWeapon, REMAINING_BULLETS: referenceWeapon.MAG_SIZE, NEXT_ALLOWED_ACTION_TIME: undefined, LAST_SHOT: undefined
        }
    }

    reload() {
        this.weapon.REMAINING_BULLETS = this.weapon.MAG_SIZE;
        this.weapon.NEXT_ALLOWED_ACTION_TIME = Date.now() + this.weapon.RELOAD_TIME;
    }

    detectHits(enemies) {

        for (let i = 0; i < enemies.length; i++) {
            this.weapon.DETECT_INTERACTION(enemies[i], this);
        }
    }

}