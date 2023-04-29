class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.x_vel = 0;
        this.y_vel = 0;

        this.speedAmplifier = 0.0012;
        this.direction = Direction.LEFT;
        this.setupWeapon(WEAPON_NAMES[0])
    }

    draw(images) {
        image(images[0], p.x, p.y);

        if (this.weapon.LAST_SHOT + this.weapon.DRAW_TIME > Date.now()) {
            // Draw bullet
            push();
            stroke(255, 255, 255);
            line(this.x, this.y, 0, this.y);
            pop();
        }
    }

    tick(enemies) {
        this.move()
        this.handleWeapon()

        return this;
    }

    move() {
        const damp = 0.998;
        this.x_vel *= Math.pow(damp, 1000/deltaTime);
        this.y_vel *= Math.pow(damp, 1000/deltaTime);

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

    }

}