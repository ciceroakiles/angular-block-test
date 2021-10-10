import { interval, Subscription } from 'rxjs';
import { ContainerComponent, PBlockComponent } from '../area-0/area-0.module';
import { LogService } from '../service/log.service';

export class Game {
    // Variaveis
    private static timerSubscription: Subscription;
    private static speed: number;
    private static start_px: number;
    private static start_py: number;

    // Definicao
    private static setup(): void {
        Game.speed = 1;
        Game.start_px = 0;
        Game.start_py = 3;
        ContainerComponent.addToMatrix(5, 3);
        PBlockComponent.setKey("RIGHT");
    }

    // Permissoes
    private static timedMoves(): void {
        // Automovimento
        if (Constants.AUTO_MOVE) PBlockComponent.autoMove();
        // Gravidade
        if (Constants.GRAVITY_P) PBlockComponent.gravity();
        if (Constants.GRAVITY_N) ContainerComponent.gravity();
    }

    static start(): void {
        Game.setup();
        Game.timerSubscription = interval(Constants.CLOCK / this.speed)
            .subscribe(() => {
                ContainerComponent.setBlocksPos();
                Game.timedMoves();
                //LogService.log(ContainerComponent.getBlocksPos());
                ContainerComponent.eraseBlocksPos();
            });
    }

    static stop(): void {
        Game.timerSubscription.unsubscribe();
    }

    // Alguns getters para comunicacao entre os componentes
    static getInitialPBlockX(): number {
        return Game.start_px;
    }
    static getInitialPBlockY(): number {
        return Game.start_py;
    }
    static getContainerMatrixValue(i: number, j: number): number {
        return ContainerComponent.getMatrixValue(i, j);
    }
    static getPBlockCompX(): number {
        return PBlockComponent.getX();
    }
    static getPBlockCompY(): number {
        return PBlockComponent.getY();
    }
}

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
}
