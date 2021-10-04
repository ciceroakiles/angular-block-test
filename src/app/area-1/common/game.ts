import { interval, Subscription } from 'rxjs';
import { Constants } from 'src/app/area-1/common/constants';
import { ContainerComponent, PBlockComponent } from 'src/app/area-1/area-1.module';
import { LogService } from 'src/app/logger/log.service';

export class Game {

    private static timerSubscription: Subscription;
    private static speed = 7;

    static setup() {
        ContainerComponent.setInitialPBlockX(4);
        ContainerComponent.setInitialPBlockY(0);
    }

    static start(): void {
        Game.setup();
        Game.timerSubscription = interval(Constants.CLOCK / this.speed)
            .subscribe(() => {
                ContainerComponent.setBlocksPos();
                // Permissao de automovimento
                if (Constants.AUTO_MOVE) PBlockComponent.autoMove();
                // Permissoes de gravidade
                if (Constants.GRAVITY_P) PBlockComponent.gravity();
                if (Constants.GRAVITY_N) ContainerComponent.gravity();

                // Regra 1 - Empilhar
                if (PBlockComponent.getY() == Constants.LINES-1 || PBlockComponent.detectCollision(0, 1)) {
                    ContainerComponent.addToMatrix(PBlockComponent.getX(), PBlockComponent.getY());
                    PBlockComponent.setX(4);
                    PBlockComponent.setY(0);
                }

                LogService.log(ContainerComponent.getBlocksPos());
                ContainerComponent.eraseBlocksPos();
            });
    }

    static stop(): void {
        LogService.log("quit 1");
        Game.timerSubscription.unsubscribe();
    }

    // Alguns getters para comunicacao entre os componentes
    static getContainerMatrixValue(i: number, j: number): number {
        return ContainerComponent.getMatrixValue(i, j);
    }
    static getContainerPBlockX(): number {
        return ContainerComponent.getInitialPBlockX();
    }
    static getContainerPBlockY(): number {
        return ContainerComponent.getInitialPBlockY();
    }
    static getPBlockCompX(): number {
        return PBlockComponent.getX();
    }
    static getPBlockCompY(): number {
        return PBlockComponent.getY();
    }
}
