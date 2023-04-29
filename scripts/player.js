class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speedAmplifier = 0.5;

        this.direction = Direction.LEFT;

        this.setupWeapon(WEAPON_NAMES[0])
        // canvas.mousePressed(this.shoot)
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