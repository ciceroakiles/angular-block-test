import { interval, Subscription } from 'rxjs';
import { Constants } from 'src/app/area-0/common/constants';
import { ContainerComponent, PBlockComponent } from 'src/app/area-0/area-0.module';
import { LogService } from 'src/app/logger/log.service';

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
        LogService.log("quit 0");
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
