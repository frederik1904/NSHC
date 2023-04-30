const Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3
}

const WEAPON_ACTION = {
    FIRED: 1,
    RELOAD: 2,
    NONE: 3
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
        DRAW_TIME: 50,
        KNOCKBACK: 0.25,
        NAME: 'NORMAL_GUN'
    },
    SHOTGIN: {
        MAG_SIZE: 2,
        RELOAD_TIME: 25,
        DAMAGE: 25,
        COOLDOWN: 300,
        DRAW_TIME: 75,
        KNOCKBACK: 0.50,
        BULLETS: 15,
        NAME: 'SHOTGIN'
    }
}

const ENTITIES = {
    'STD': {
        SPEED: 0.05,
        HEALTH: 200,
        HEIGHT: 30,
        WIDTH: 20
    }, 'PLAYER': {
        SPEED: 0.05,
        HEALTH: 200,
        HEIGHT: 30,
        WIDTH: 20
    }
}




const WEAPON_NAMES = Object.getOwnPropertyNames(WEAPONS)