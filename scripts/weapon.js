class Weapon {
    constructor(config) {
        this.config = {...config}
        this.REMAINING_BULLETS = config.MAG_SIZE;
        this.NEXT_ALLOWED_ACTION_TIME = undefined;
        this.LAST_SHOT = undefined;
        this.AMMO = config.START_AMMO;

        this.bulletArray = []
    }

    tick(enemies, player) {
        if (keyIsDown(32) && this.canShoot()) { // shoot, space
            this.REMAINING_BULLETS -= 1;
            this.NEXT_ALLOWED_ACTION_TIME = Date.now() + this.config.COOLDOWN;
            this.LAST_SHOT = Date.now();

            this.bulletArray = []
            let SPREAD = this.config.SPREAD;
            for (let i = 0; i < this.config.BULLETS; i++) {
                let offset = 0;
                if(SPREAD > 0) {
                    offset = Math.round(Math.random() * SPREAD) - (SPREAD / 2);
                }
                this.bulletArray.push({x: player.x - this.config.SHOOT_DISTANCE, y: player.getWeaponHeight() + offset})
            }

            for (let i = 0; i < enemies.length; i++) {
                this.detectInteraction(player, enemies[i]);
            }

            player.x_vel = this.config.KNOCKBACK

            return WEAPON_ACTION.FIRED;
        }

        if (keyIsDown(82) && this.canWeaponAction()) { // r            
            this.reload();
            return WEAPON_ACTION.RELOAD;
        }

        return WEAPON_ACTION.NONE;
    }

    draw(player) {
        if (this.LAST_SHOT + this.config.DRAW_TIME > Date.now()) {
            push();
            stroke(200, 150, 50, 150);
            strokeWeight(5);
            for (let i = 0; i < this.bulletArray.length; i++) {
                line(player.x, player.getWeaponHeight(), this.bulletArray[i].x, this.bulletArray[i].y);
            }
            pop();
        }
    }

    reload() {
        if (this.AMMO > 0 && this.REMAINING_BULLETS != this.config.MAG_SIZE) {
            this.REMAINING_BULLETS = Math.min(this.config.MAG_SIZE, this.AMMO);
            this.AMMO = this.AMMO - Math.min(this.config.MAG_SIZE, this.AMMO)
            this.NEXT_ALLOWED_ACTION_TIME = Date.now() + this.config.RELOAD_TIME;
        }
    }

    detectInteraction(player, enemy) {
        let x1 = player.x;
        let y1 = player.getWeaponHeight();

        for (let i = 0; i < this.bulletArray.length; i++) {
            let x2 = this.bulletArray[i].x;
            let y2 = this.bulletArray[i].y;
            let enemyDims = enemy.getDimensions();
            let sx = enemy.x;
            let sy = enemy.y;
            let sw = enemyDims.WIDTH;
            let sh = enemyDims.HEIGHT;


            if (this.lineRect(x1, y1, x2, y2, sx, sy, sw, sh)) {
                enemy.hit(this.config.DAMAGE)
            }
        }

    }

    canShoot() {
        return this.REMAINING_BULLETS > 0 && this.canWeaponAction();
    }

    canWeaponAction() {
        return this.NEXT_ALLOWED_ACTION_TIME === undefined
            || this.NEXT_ALLOWED_ACTION_TIME < Date.now();
    }


    lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {

        // check if the line has hit any of the rectangle's sides
        // uses the Line/Line function below
        let left = this.lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
        let right = this.lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
        let top = this.lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
        let bottom = this.lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

        // if ANY of the above are true, the line
        // has hit the rectangle
        return (left || right || top || bottom);
    }


    lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
        // calculate the direction of the lines
        let uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        let uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        // if uA and uB are between 0-1, lines are colliding
        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {

            // optionally, draw a circle where the lines meet
            let intersectionX = x1 + (uA * (x2 - x1));
            let intersectionY = y1 + (uA * (y2 - y1));
            push();
            fill(255, 0, 0);
            noStroke();
            ellipse(intersectionX, intersectionY, 20, 20);
            pop();
            return true;
        }
        return false;
    }

}