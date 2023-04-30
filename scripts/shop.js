class Shop {
    constructor() {
        this.height = 30
        this.items = WEAPON_NAMES

        this.selected = 0;
        this.cooldown = 100;
        this.NEXT_ALLOWED_ACTION_TIME = undefined;
    }

    draw() {
        push();

        const shopY1 = HEIGHT - this.height;
        const shopY2 = HEIGHT;

        fill(255, 0, 255)
        rect(0, shopY1, WIDTH, this.height)

        const rectSize = WIDTH / this.items.length
        fill(0, 0, 0)
        for (let i = 0; i < this.items.length; i++) {
            const x = rectSize * i;
            line(x + rectSize, shopY1, x + rectSize, shopY2);

            textAlign(CENTER);

            text(this.items[i], x + (rectSize / 2), shopY1 + (this.height / 2))

            if (i == this.selected) {
                fill(0, 0, 0, 100)
                rect(x, shopY1, rectSize, this.height)
            }

            fill(0, 0, 0)
        }

        pop();
    }

    tick(player) {
        if (this.canDoAction()) {
            if (keyIsDown(81)) {
                this.selected = ((this.selected - 1) + this.items.length) % this.items.length;
                this.NEXT_ALLOWED_ACTION_TIME = Date.now() + this.cooldown;
            }

            if (keyIsDown(69)) {
                this.selected = ((this.selected + 1) + this.items.length) % this.items.length;
                this.NEXT_ALLOWED_ACTION_TIME = Date.now() + this.cooldown;
            }

            if (keyIsDown(66)) {
                let couldBuy = player.withdrawMoney(WEAPONS[this.items[this.selected]].PRICE);
                if (couldBuy) {
                    player.setupWeapon(this.items[this.selected])
                }
                this.NEXT_ALLOWED_ACTION_TIME = Date.now() + this.cooldown;
            }
        }
    }

    canDoAction() {
        return this.NEXT_ALLOWED_ACTION_TIME === undefined
            || this.NEXT_ALLOWED_ACTION_TIME < Date.now();
    }
}