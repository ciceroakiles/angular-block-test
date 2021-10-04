import { interval, Subscription } from 'rxjs';
import { Constants } from 'src/app/area-1/common/constants';
import { ContainerComponent, PBlockComponent } from 'src/app/area-1/area-1.module';

export class Game {

    static timerSubscription: Subscription;

    static setup() {
        ContainerComponent.setPBlockX(0);
        ContainerComponent.setPBlockY(0);
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
