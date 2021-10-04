import { interval, Subscription } from 'rxjs';
import { Constants } from 'src/app/area-0/common/constants';
import { ContainerComponent, PBlockComponent } from 'src/app/area-0/area-0.module';

export class Game {

    static timerSubscription: Subscription;

    static setup() {
        ContainerComponent.setPBlockX(0);
        ContainerComponent.setPBlockY(3);
        ContainerComponent.addToMatrix(2, 1);
        ContainerComponent.addToMatrix(5, 3);
        ContainerComponent.addToMatrix(2, 7);
    }

    static start(): void {
        Game.setup();
        Game.timerSubscription = interval(Constants.TIME)
            .subscribe(() => {
                ContainerComponent.getBlocksPos();
                // Permissoes de gravidade
                if (Constants.GRAVITY_P) PBlockComponent.gravity();
                if (Constants.GRAVITY_N) ContainerComponent.gravity();
                ContainerComponent.eraseBlocksPos();
            });
    }

    static stop(): void{
        Game.timerSubscription.unsubscribe();
    }
}
