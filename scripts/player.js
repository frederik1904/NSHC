class Player {
    constructor(x, y, canvas) {
        this.x = x;
        this.y = y;
        this.canvas = canvas;
        this.speedAmplifier = 0.5;

        this.direction = Direction.LEFT;

        this.setupWeapon(WEAPON_NAMES[0])
        // canvas.mousePressed(this.shoot)
    }

    draw(images) {
        // Draw player
        push();
        fill(255, 0, 255);
        rect(p.x, p.y, 20, 20);
        pop();

        if (this.weapon.LAST_SHOT + this.weapon.DRAW_TIME > Date.now()) {
            // Draw bullet
            push();
            fill(0, 255, 255);
            stroke(255, 255, 255);
            line(this.x, this.y, 0, this.y);
            pop();
        }
    }

    tick() {
        this.move()
        this.handleWeapon()
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

    handleWeapon() {
        if (keyIsDown(32) && this.canShoot()) {
            this.weapon.REMAINING_BULLETS -= 1;
            this.weapon.NEXT_ALLOWED_ACTION_TIME = Date.now() + this.weapon.COOLDOWN;
            this.weapon.LAST_SHOT = Date.now();
            console.log(this.weapon);
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


}