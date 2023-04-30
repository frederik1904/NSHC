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
        START_AMMO: 9999,
        RELOAD_TIME: 50,
        DAMAGE: 100,
        COOLDOWN: 200,
        DRAW_TIME: 50,
        KNOCKBACK: 0.125,
        SHOOT_DISTANCE: 300,
        BULLETS: 1,
        SPREAD: 0,
        NAME: 'NORMAL_GUN'
    },
    SHOTGIN: {
        MAG_SIZE: 2,
        START_AMMO: 30,
        RELOAD_TIME: 25,
        DAMAGE: 25,
        COOLDOWN: 300,
        DRAW_TIME: 75,
        KNOCKBACK: 0.50,
        BULLETS: 15,
        SHOOT_DISTANCE: 100,
        SPREAD: 30,
        NAME: 'SHOTGIN'
    },
    'REVOLVER': {
        MAG_SIZE: 8,
        START_AMMO: 50,
        RELOAD_TIME: 300,
        DAMAGE: 200,
        COOLDOWN: 1000,
        DRAW_TIME: 100,
        KNOCKBACK: 0.5,
        SHOOT_DISTANCE: 500,
        BULLETS: 1,
        SPREAD: 20,
        NAME: 'REVOLVER'
    },
    'SMG': {
        MAG_SIZE: 50,
        RELOAD_TIME: 500,
        START_AMMO: 200,
        DAMAGE: 25,
        COOLDOWN: 40,
        DRAW_TIME: 25,
        KNOCKBACK: 0.15,
        SHOOT_DISTANCE: 400,
        BULLETS: 1,
        SPREAD: 50,
        NAME: 'SMG',
    }
}

const ENTITIES = {
    'STD': {
        SPEED: 0.05,
        HEALTH: 200,
        HEIGHT: 30,
        WIDTH: 20,
        KILL_REWARD: 50,
    }, 'PLAYER': {
        SPEED: 0.0012,
        HEALTH: 200,
        HEIGHT: 30,
        WIDTH: 20
    }
}


const WEAPON_NAMES = Object.getOwnPropertyNames(WEAPONS)