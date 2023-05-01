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
        MAG_SIZE: 12,
        START_AMMO: 12000,
        RELOAD_TIME: 1400,
        DAMAGE: 80,
        COOLDOWN: 200,
        DRAW_TIME: 50,
        KNOCKBACK: 0.1,
        SHOOT_DISTANCE: 300,
        BULLETS: 1,
        SPREAD: 30,
        NAME: 'Pistol',
        PRICE: 0
    },
    SHOTGIN: {
        MAG_SIZE: 4,
        START_AMMO: 24,
        RELOAD_TIME: 1200,
        DAMAGE: 30,
        COOLDOWN: 300,
        DRAW_TIME: 75,
        KNOCKBACK: 2.0,
        BULLETS: 18,
        SHOOT_DISTANCE: 100,
        SPREAD: 60,
        NAME: 'Shotgun',
        PRICE: 500
    },
    'REVOLVER': {
        MAG_SIZE: 7,
        START_AMMO: 35,
        RELOAD_TIME: 2000,
        DAMAGE: 200,
        COOLDOWN: 1000,
        DRAW_TIME: 100,
        KNOCKBACK: 0.8,
        SHOOT_DISTANCE: 2000,
        BULLETS: 1,
        SPREAD: 70,
        NAME: 'Deagle',
        PRICE: 1000
    },
    'SMG': {
        MAG_SIZE: 50,
        RELOAD_TIME: 2000,
        START_AMMO: 200,
        DAMAGE: 40,
        COOLDOWN: 40,
        DRAW_TIME: 25,
        KNOCKBACK: 0.15,
        SHOOT_DISTANCE: 450,
        BULLETS: 1,
        SPREAD: 50,
        NAME: 'SMG',
        PRICE: 2000
    }
}

const ENTITIES = {
    'STD': {
        SPEED: 0.05,
        HEALTH: 200,
        HEIGHT: 30,
        WIDTH: 20,
        KILL_REWARD: 50,
        IMAGE_INDEX: 1,
    }, 'PLAYER': {
        SPEED: 0.0012,
        HEALTH: 200,
        HEIGHT: 30,
        WIDTH: 20
    }, 'BIKE': {
        SPEED: 0.15,
        HEALTH: 400,
        HEIGHT: 34,
        WIDTH: 43,
        KILL_REWARD: 100,
        IMAGE_INDEX: 4,
    }, 'CAR': {
        SPEED: 0.03,
        HEALTH: 3500,
        HEIGHT: 38,
        WIDTH: 47,
        KILL_REWARD: 10000,
        IMAGE_INDEX: 5,
    }
}


const WEAPON_NAMES = Object.getOwnPropertyNames(WEAPONS)