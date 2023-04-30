const Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
}

const WIDTH = 800;
const HEIGHT = 600;


//ms
const BULLET_DRAW_TIME = 200


const WEAPONS = {
    'NORMAL_GUN': {
        MAG_SIZE: 5,
        RELOAD_TIME: 50,
        DAMAGE: 100,
        COOLDOWN: 200,
        DRAW_TIME: 25,
        DETECT_INTERACTION: (enemy, player) => {
            const size = 2;
            if (enemy.y >= player.y - size && enemy.y <= player.y + size) {
                enemy.hit(WEAPONS.NORMAL_GUN.DAMAGE)
            }
        },
        DRAW: (player) => {
            push();
            stroke(255, 255, 255);
            line(player.x, player.y, 0, player.y);
            pop();
        }
    }
}

const MAILMAN = {
    'STD': {
        SPEED: 0.05,
        HEALTH: 200
    }
}




const WEAPON_NAMES = Object.getOwnPropertyNames(WEAPONS)