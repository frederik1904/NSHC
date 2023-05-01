class Shop {
    constructor() {
        this.height = 30
        this.items = WEAPON_NAMES

        this.selected = 0;
        this.cooldown = 200;
        this.NEXT_ALLOWED_ACTION_TIME = undefined;
    }

    draw() {
        push();

        const shopY1 = HEIGHT + translateAmount;
        const shopY2 = shopY1 + this.height;

        fill(200, 140, 50);
        rect(0, shopY1, WIDTH, this.height)

        const rectSize = WIDTH / this.items.length

        for (let i = 0; i < this.items.length; i++) {
            fill(0, 0, 0)
            stroke(0);
            const x = rectSize * i;
            strokeWeight(2);
            line(x + rectSize, shopY1, x + rectSize, shopY2);

            textAlign(CENTER);
            strokeWeight(0);
            textStyle(NORMAL);
            stroke(255);
            fill(255);
            text(`${WEAPONS[this.items[i]].NAME} (${WEAPONS[this.items[i]].PRICE}$)`, x + (rectSize / 2), shopY1 + (this.height / 2))

            fill(0, 0, 0)
            stroke(0);
            if (i != this.selected) {
                strokeWeight(2);
                fill(0, 0, 0, 100)
                rect(x, shopY1, rectSize, this.height)
            }

            fill(0, 0, 0)
        }

        pop();
    }

    tick(player) {
        if (this.canDoAction()) {
            if (keyIsDown(81)) { // q
                this.selected = ((this.selected - 1) + this.items.length) % this.items.length;
                this.NEXT_ALLOWED_ACTION_TIME = Date.now() + this.cooldown;
            }

            if (keyIsDown(69)) { // e
                this.selected = ((this.selected + 1) + this.items.length) % this.items.length;
                this.NEXT_ALLOWED_ACTION_TIME = Date.now() + this.cooldown;
            }

            if (keyIsDown(66)) { // b
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