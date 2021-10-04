import { interval, Subscription } from 'rxjs';
import { Constants } from 'src/app/area-0/common/constants';
import { ContainerComponent, PBlockComponent } from 'src/app/area-0/area-0.module';
import { LogService } from 'src/app/logger/log.service';

export class Game {

    private static timerSubscription: Subscription;
    private static speed = 1;

    static setup() {
        ContainerComponent.setPBlockX(0);
        ContainerComponent.setPBlockY(3);
        ContainerComponent.addToMatrix(5, 3);
        PBlockComponent.setKey("RIGHT");
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
                //LogService.log(ContainerComponent.getBlocksPos());
                ContainerComponent.eraseBlocksPos();
            });
    }

    static stop(): void {
        LogService.log("quit 0");
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
