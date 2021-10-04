import { interval, Subscription } from 'rxjs';
import { Constants } from 'src/app/area-0/common/constants';
import { ContainerComponent, PBlockComponent } from 'src/app/area-0/area-0.module';

export class TimerService {

    static timerSubscription: Subscription;

    static start(): void {
        TimerService.timerSubscription = interval(Constants.TIME)
            .subscribe(() => {
                ContainerComponent.getBlocksPos();
                // Permissoes de gravidade
                if (Constants.GRAVITY_P) PBlockComponent.gravity();
                if (Constants.GRAVITY_N) ContainerComponent.gravity();
                ContainerComponent.blocksPos = [];
            });
    }

    static stop(): void{
        TimerService.timerSubscription.unsubscribe();
    }
}
