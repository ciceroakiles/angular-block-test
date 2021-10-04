export class Constants {
    // Time
    static TIME: number = 2000;
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
    static LOOP_V: boolean = false;
    // Gravity
    static GRAVITY_P: boolean = true;
    static GRAVITY_N: boolean = true;
    // Collisions
    static COLLIDE_P_TO_N: boolean = true;
    static COLLIDE_N_TO_P: boolean = true;
    static COLLIDE_N_TO_N: boolean = true;
}
