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
        DRAW_TIME: 25
    }
}

const WEAPON_NAMES = Object.getOwnPropertyNames(WEAPONS)