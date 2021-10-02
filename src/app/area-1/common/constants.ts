export class Constants {
    // Block
    static BLOCK_W: number = 2;
    static BLOCK_H: number = 2;
    // Box
    static BOX_COLS: number = 8;
    static BOX_LINES: number = 16;
    static ADJUST: number = 0.15;
    static BOX_W: number = (Constants.BLOCK_W * Constants.BOX_COLS) + Constants.ADJUST;
    static BOX_H: number = (Constants.BLOCK_H * Constants.BOX_LINES) + Constants.ADJUST;
    // Coord.
    static MIN_X: number = 0;
    static MIN_Y: number = 0;
    static MAX_X: number = Math.round(Constants.BOX_W - Constants.ADJUST) - Constants.BLOCK_W;
    static MAX_Y: number = Math.round(Constants.BOX_H - Constants.ADJUST) - Constants.BLOCK_H;
    // Loops
    static LOOP_H: boolean = false;
    static LOOP_V: boolean = false;
}
