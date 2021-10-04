export class Constants {
    // Time
    static CLOCK: number = 1000;
    // Block
    static BLOCK_W: number = 1.5;
    static BLOCK_H: number = 1.5;
    // Container
    static COLUMNS: number = 10;
    static LINES: number = 20;
    static ADJUST: number = 0.15;
    static BOX_W: number = (Constants.BLOCK_W * Constants.COLUMNS) + Constants.ADJUST;
    static BOX_H: number = (Constants.BLOCK_H * Constants.LINES) + Constants.ADJUST;
    // Mins/maxs
    static MIN_X: number = 0;
    static MIN_Y: number = 0;
    static MAX_X: number = Math.round(Constants.BOX_W - Constants.ADJUST) - Constants.BLOCK_W;
    static MAX_Y: number = Math.round(Constants.BOX_H - Constants.ADJUST) - Constants.BLOCK_H;
    // Loops
    static LOOP_H: boolean = false;
    static LOOP_V: boolean = false;
    // Gravity
    static GRAVITY_P: boolean = true;
    static GRAVITY_N: boolean = false;
    // Collisions
    static COLLIDE_P_TO_N: boolean = true;
    static COLLIDE_N_TO_P: boolean = true;
    static COLLIDE_N_TO_N: boolean = true;
    // Motion
    static AUTO_MOVE: boolean = false;
    static CAN_STOP: boolean = false;
    static ALLOW_UP: boolean = false;
    static ALLOW_DOWN: boolean = false;
    static ALLOW_LEFT: boolean = true;
    static ALLOW_RIGHT: boolean = true;
}
