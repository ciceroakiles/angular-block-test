import { interval, Subscription } from 'rxjs';
import { Constants } from 'src/app/area-1/common/constants';
import { ContainerComponent, PBlockComponent } from 'src/app/area-1/area-1.module';
import { LogService } from 'src/app/logger/log.service';

export class Game {
    // Variaveis
    private static timerSubscription: Subscription;
    private static speed: number;
    private static start_px: number;
    private static start_py: number;

    // Definicao
    private static setup(): void {
        Game.speed = 7;
        Game.start_px = 4;
        Game.start_py = 0;
    }

    // Regra 1 - Empilhar
    private static rule1(): void {
        // Verifica se atingiu a ultima linha, ou parou sobre um bloco (p-block)
        if (PBlockComponent.getY() == Constants.LINES-1 || PBlockComponent.detectCollision(0, 1)) {
            // Cria um bloco no local exato e retorna ao inicio
            ContainerComponent.addToMatrix(PBlockComponent.getX(), PBlockComponent.getY());
            PBlockComponent.setX(Game.start_px);
            PBlockComponent.setY(Game.start_py);
        }
    }

    // Regra 2 - Desempilhar linha horizontal completa
    private static rule2(): void {
        // Verificacao linha por linha
        for (var line: number = 0; line < Constants.LINES; line++) {
            let blocksPos: number[][] = ContainerComponent.getBlocksPos();
            let cont = 0, flag = false;
            for (var i in blocksPos) {
                // Aumenta o contador para cada bloco vizinho
                if (line == blocksPos[i][1]) cont++;
                // Se o contador se iguala as colunas, inicia remocao
                if (cont == Constants.COLUMNS) {
                    flag = true;
                    break;
                }
            }
            cont = 0;
            if (flag) {
                // Remove cada bloco da linha
                for (var i in blocksPos) {
                    if (line == blocksPos[i][1]) {
                        ContainerComponent.remFromMatrix(blocksPos[i][0], blocksPos[i][1]);
                    }
                }
                flag = false;
            }
        }
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
                Game.rule1();
                Game.rule2();
                //LogService.log(ContainerComponent.getBlocksPos());
                ContainerComponent.eraseBlocksPos();
            });
    }

    static stop(): void {
        LogService.log("quit 1");
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
