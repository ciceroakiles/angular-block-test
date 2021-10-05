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
        Game.speed = 10;
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
    private static rule2(lineArg: number): void {
        var cont = 0, blocksPos: number[][] = ContainerComponent.getBlocksPos();
        for (var i in blocksPos) {
            // Contador de blocos vizinhos: caso se iguale as colunas, inicia remocao
            if (lineArg == blocksPos[i][1]) cont++;
            if (cont == Constants.COLUMNS) break;
        }
        if (cont == Constants.COLUMNS) {
            // Remove cada bloco da mesma linha
            for (var i in blocksPos) {
                let col = blocksPos[i][0], line = blocksPos[i][1];
                if (lineArg == line) ContainerComponent.remFromMatrix(col, line);
            }
            cont = 0;
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
                for (var line: number = 0; line < Constants.LINES; line++) {
                    Game.rule2(line);
                }
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
