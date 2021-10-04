import { interval, Subscription } from 'rxjs';
import { Constants } from 'src/app/area-0/common/constants';
import { ContainerComponent, PBlockComponent } from 'src/app/area-0/area-0.module';

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
                ContainerComponent.getBlocksPos();
                // Permissao de automovimento
                if (Constants.CAN_AUTOMOVE) PBlockComponent.autoMove();
                // Permissoes de gravidade
                if (Constants.GRAVITY_P) PBlockComponent.gravity();
                if (Constants.GRAVITY_N) ContainerComponent.gravity();
                ContainerComponent.eraseBlocksPos();
            });
    }

    static stop(): void{
        Game.timerSubscription.unsubscribe();
    }

    // Alguns getters para comunicacao entre os componentes
    static getContainerMatrixValue(i: number, j: number): number {
        return ContainerComponent.getMatrixValue(i, j);
    }
    static getContainerPBlockX(): number {
        return ContainerComponent.getPBlockX();
    }
    static getContainerPBlockY(): number {
        return ContainerComponent.getPBlockY();
    }
    static getPBlockCompX(): number {
        return PBlockComponent.getX();
    }
    static getPBlockCompY(): number {
        return PBlockComponent.getY();
    }
}
