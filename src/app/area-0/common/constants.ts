export class Constants {
    // Time
    static CLOCK: number = 1000;
    // Blocks
    static BLOCK_W: number = 4;
    static BLOCK_H: number = 4;
    // Container
    static COLUMNS: number = 8;
    static LINES: number = 8;
    static ADJUST: number = 0.15;
    static BOX_W: number = (Constants.BLOCK_W * Constants.COLUMNS) + Constants.ADJUST;
    static BOX_H: number = (Constants.BLOCK_H * Constants.LINES) + Constants.ADJUST;
    // Mins/maxs
    static MIN_X: number = 0;
    static MIN_Y: number = 0;
    static MAX_X: number = Math.round(Constants.BOX_W - Constants.ADJUST) - Constants.BLOCK_W;
    static MAX_Y: number = Math.round(Constants.BOX_H - Constants.ADJUST) - Constants.BLOCK_H;
    // Loops
    static LOOP_H: boolean = true;
    static LOOP_V: boolean = true;
    // Gravity
    static GRAVITY_P: boolean = false;
    static GRAVITY_N: boolean = false;
    // Collisions
    static COLLIDE_P_TO_N: boolean = false;
    static COLLIDE_N_TO_P: boolean = false;
    static COLLIDE_N_TO_N: boolean = false;
    // Motion
    static AUTO_MOVE: boolean = true;
    static CAN_STOP: boolean = false;
    static ALLOW_UP: boolean = false;
    static ALLOW_DOWN: boolean = false;
    static ALLOW_LEFT: boolean = true;
    static ALLOW_RIGHT: boolean = true;
}
