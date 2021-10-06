import { interval, Subscription } from 'rxjs';
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
        Game.speed = 8;
        Game.start_px = 4;
        Game.start_py = 1;
    }

    // Regra 1 - Adicionar mais blocos nas posicoes e voltar ao inicio
    private static rule1(): void {
        var x = PBlockComponent.getX(), y = PBlockComponent.getY();
        ContainerComponent.addToMatrix(x, y);
        
        // Reset
        PBlockComponent.setX(Game.start_px);
        PBlockComponent.setY(Game.start_py);
    }

    // Regra 2 - Detectar colisoes
    private static rule2(): void {
        var x = PBlockComponent.getX(), y = PBlockComponent.getY();
        
        // Verifica se atingiu a ultima linha, ou parou sobre um bloco (p-block)
        if (y == Constants.LINES-1 || PBlockComponent.detectCollision(0, 1)) {
            Game.rule1();
        }
    }

    // Regra 3 - Desempilhar linha horizontal completa
    private static rule3(lineArg: number): void {
        var blocksPos: number[][] = ContainerComponent.getBlocksPos();
        var col, line, cont: number = 0;
        for (var i in blocksPos) {
            // Conta blocos vizinhos: caso se iguale as colunas, inicia remocao
            if (lineArg == blocksPos[i][1]) cont++;
            if (cont == Constants.COLUMNS) break;
        }
        if (cont == Constants.COLUMNS) {
            // Remove cada bloco da mesma linha
            for (var i in blocksPos) {
                col = blocksPos[i][0], line = blocksPos[i][1];
                if (lineArg == line) ContainerComponent.remFromMatrix(col, line);
            }
            // Apos remover a linha, simula gravidade
            for (var j: number = lineArg-1; j >= 0; j--) {
                for (var i in blocksPos) {
                    col = blocksPos[i][0], line = blocksPos[i][1];
                    if (j == line) {
                        // Move blocos para baixo
                        ContainerComponent.addToMatrix(col, line+1);
                        ContainerComponent.remFromMatrix(col, line);
                    }
                }
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
                Game.rule2();
                for (var line: number = 0; line < Constants.LINES; line++) {
                    Game.rule3(line);
                }
                //LogService.log(ContainerComponent.getBlocksPos());
                ContainerComponent.eraseBlocksPos();
            });
    }

    static stop(): void {
        Game.timerSubscription.unsubscribe();
        LogService.log("quit 1");
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
    static BLOCK_W: number = 1.5;
    static BLOCK_H: number = 1.5;
    // Container
    static COLUMNS: number = 10;
    static LINES: number = 20;
    static ADJUST: number = 0.15;
    static BOX_W: number = (Constants.BLOCK_W * Constants.COLUMNS) + Constants.ADJUST;
    static BOX_H: number = (Constants.BLOCK_H * Constants.LINES) + Constants.ADJUST;
    // Mins/maxs
    static MIN_X: number = 0;
    static MIN_Y: number = 0;
    static MAX_X: number = Math.round(Constants.BOX_W - Constants.ADJUST) - Constants.BLOCK_W;
    static MAX_Y: number = Math.round(Constants.BOX_H - Constants.ADJUST) - Constants.BLOCK_H;
    // Loops
    static LOOP_H: boolean = false;
    static LOOP_V: boolean = false;
    // Gravity
    static GRAVITY_P: boolean = true;
    static GRAVITY_N: boolean = false;
    // Collisions
    static COLLIDE_P_TO_N: boolean = true;
    static COLLIDE_N_TO_P: boolean = true;
    static COLLIDE_N_TO_N: boolean = true;
    // Motion
    static AUTO_MOVE: boolean = false;
    static CAN_STOP: boolean = false;
    static ALLOW_UP: boolean = false;
    static ALLOW_DOWN: boolean = false;
    static ALLOW_LEFT: boolean = true;
    static ALLOW_RIGHT: boolean = true;
}
