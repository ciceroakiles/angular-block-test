import { interval, Subscription } from 'rxjs';
import { ContainerComponent, PBlockComponent } from '../area-2/area-2.module';
import { RNGService } from '../service/rng.service';
import { LogService } from '../service/log.service';

export class Game {
    // Variaveis
    private static timerSubscription: Subscription;
    private static speed: number;
    private static start_px: number;
    private static start_py: number;

    private static largerGroup: boolean;
    private static gPattern: number;

    static gameOver: boolean = false;
    //static iniPattern: number = 16; // Testes

    // Definicoes iniciais
    private static setup(): void {
        Game.speed = 7;
        Game.start_px = 4;
        Game.start_py = -2;

        Game.largerGroup = true;
        Game.gPattern = RNGService.randomInt(1, 16); //this.iniPattern;
    }

    // Regra 1 - Adicionar mais blocos nas posicoes
    private static rule1(): void {
        var x = PBlockComponent.getX(), y = PBlockComponent.getY();
        ContainerComponent.addToMatrix(x, y);
        if (Game.largerGroup) {
            // Preenche de acordo com o grupo de blocos
            switch (Game.gPattern) {
                // Grupos iniciais
                case 1: {
                    ContainerComponent.addToMatrix(x+1, y);
                    ContainerComponent.addToMatrix(x, y-1);
                    ContainerComponent.addToMatrix(x+1, y-1);
                } break;
                case 2: {
                    ContainerComponent.addToMatrix(x+1, y);
                    ContainerComponent.addToMatrix(x, y-1);
                    ContainerComponent.addToMatrix(x-1, y-1);
                } break;
                case 3: {
                    ContainerComponent.addToMatrix(x-1, y);
                    ContainerComponent.addToMatrix(x, y-1);
                    ContainerComponent.addToMatrix(x+1, y-1);
                } break;
                case 4: {
                    ContainerComponent.addToMatrix(x-1, y);
                    ContainerComponent.addToMatrix(x+1, y);
                    ContainerComponent.addToMatrix(x+1, y+1);
                } break;
                case 5: {
                    ContainerComponent.addToMatrix(x-1, y);
                    ContainerComponent.addToMatrix(x+1, y);
                    ContainerComponent.addToMatrix(x-1, y+1);
                } break;
                case 6: {
                    ContainerComponent.addToMatrix(x-1, y);
                    ContainerComponent.addToMatrix(x+1, y);
                    ContainerComponent.addToMatrix(x, y+1);
                } break;
                case 7: {
                    ContainerComponent.addToMatrix(x-1, y);
                    ContainerComponent.addToMatrix(x+1, y);
                    ContainerComponent.addToMatrix(x+2, y);
                } break;
                // Grupos rotacionados
                case 8: {
                    ContainerComponent.addToMatrix(x, y-1);
                    ContainerComponent.addToMatrix(x-1, y);
                    ContainerComponent.addToMatrix(x-1, y+1);
                } break;
                case 9: {
                    ContainerComponent.addToMatrix(x, y-1);
                    ContainerComponent.addToMatrix(x+1, y);
                    ContainerComponent.addToMatrix(x+1, y+1);
                } break;
                case 10: {
                    ContainerComponent.addToMatrix(x, y+1);
                    ContainerComponent.addToMatrix(x, y-1);
                    ContainerComponent.addToMatrix(x+1, y-1);
                } break;
                case 11: {
                    ContainerComponent.addToMatrix(x+1, y);
                    ContainerComponent.addToMatrix(x-1, y);
                    ContainerComponent.addToMatrix(x-1, y-1);
                } break;
                case 12: {
                    ContainerComponent.addToMatrix(x, y-1);
                    ContainerComponent.addToMatrix(x, y+1);
                    ContainerComponent.addToMatrix(x-1, y+1);
                } break;
                case 13: {
                    ContainerComponent.addToMatrix(x, y-1);
                    ContainerComponent.addToMatrix(x, y+1);
                    ContainerComponent.addToMatrix(x+1, y+1);
                } break;
                case 14: {
                    ContainerComponent.addToMatrix(x+1, y);
                    ContainerComponent.addToMatrix(x-1, y);
                    ContainerComponent.addToMatrix(x+1, y-1);
                } break;
                case 15: {
                    ContainerComponent.addToMatrix(x-1, y-1);
                    ContainerComponent.addToMatrix(x, y-1);
                    ContainerComponent.addToMatrix(x, y+1);
                } break;
                case 16: {
                    ContainerComponent.addToMatrix(x, y-2);
                    ContainerComponent.addToMatrix(x, y-1);
                    ContainerComponent.addToMatrix(x, y+1);
                } break;
                default: break;
            }
        }
    }

    // Regra 2 - Desempilhar linha horizontal completa
    private static rule2(lineArg: number): void {
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

    // Regra 3 - Detectar colisoes abaixo
    private static rule3(): void {
        var x = PBlockComponent.getX(), y = PBlockComponent.getY();
        var flag: boolean = false;
        // Colisoes de grupo
        if (Game.largerGroup) {
            switch (Game.gPattern) {
                // Grupos iniciais
                case 1: {
                    flag = (ContainerComponent.detectNCollision(x+1, y+1));
                } break;
                case 2: {
                    flag = (ContainerComponent.detectNCollision(x+1, y+1) || ContainerComponent.detectNCollision(x-1, y));
                } break;
                case 3: {
                    flag = (ContainerComponent.detectNCollision(x-1, y+1) || ContainerComponent.detectNCollision(x+1, y));
                } break;
                case 4: {
                    flag = (ContainerComponent.detectNCollision(x-1, y+1) || ContainerComponent.detectNCollision(x+1, y+2));
                } break;
                case 5: {
                    flag = (ContainerComponent.detectNCollision(x-1, y+2) || ContainerComponent.detectNCollision(x+1, y+1));
                } break;
                case 6: {
                    flag = (ContainerComponent.detectNCollision(x-1, y+1) || ContainerComponent.detectNCollision(x+1, y+1) || ContainerComponent.detectNCollision(x, y+2));
                } break;
                case 7: {
                    flag = (ContainerComponent.detectNCollision(x-1, y+1) || ContainerComponent.detectNCollision(x+1, y+1) || ContainerComponent.detectNCollision(x+2, y+1));
                } break;
                // Grupos rotacionados
                case 8: {
                    flag = (ContainerComponent.detectNCollision(x-1, y+2));
                } break;
                case 9: {
                    flag = (ContainerComponent.detectNCollision(x+1, y+2));
                } break;
                case 10: {
                    flag = (ContainerComponent.detectNCollision(x, y+2) || ContainerComponent.detectNCollision(x+1, y));
                } break;
                case 11: {
                    flag = (ContainerComponent.detectNCollision(x-1, y+1) || ContainerComponent.detectNCollision(x+1, y+1));
                } break;
                case 12: {
                    flag = (ContainerComponent.detectNCollision(x, y+2) || ContainerComponent.detectNCollision(x-1, y+2));
                } break;
                case 13: {
                    flag = (ContainerComponent.detectNCollision(x, y+2) || ContainerComponent.detectNCollision(x+1, y+2));
                } break;
                case 14: {
                    flag = (ContainerComponent.detectNCollision(x-1, y+1) || ContainerComponent.detectNCollision(x+1, y+1));
                } break;
                case 15: {
                    flag = (ContainerComponent.detectNCollision(x, y+2) || ContainerComponent.detectNCollision(x-1, y));
                } break;
                case 16: {
                    flag = (ContainerComponent.detectNCollision(x, y+2));
                } break;
                default: break;
            }
            if (!flag) {
                // Verifica se atingiu a ultima linha (n-block)
                if (y == Constants.LINES-2) {
                    switch (Game.gPattern) {
                        case 4:
                        case 5:
                        case 6:
                        case 8:
                        case 9:
                        case 10:
                        case 12:
                        case 13:
                        case 15:
                        case 16: {
                            flag = true;
                        } break;
                        default: break;
                    }
                }
                if (y == Constants.LINES-1) flag = true;
                // Verifica se parou sobre um bloco (p-block)
                if (PBlockComponent.detectCollision(0, 1)) flag = true;
            }
            if (flag) Game.rule98();
        }
    }

    // Regra 4 - Restringir movimentos por colisoes laterais
    private static rule4(): void {
        var x = PBlockComponent.getX(), y = PBlockComponent.getY();
        if (Game.largerGroup) {
            switch (Game.gPattern) {
                // Grupos iniciais
                case 1: {
                    PBlockComponent.ALLOW_LEFT = !(PBlockComponent.getX() == 0);
                    PBlockComponent.ALLOW_RIGHT = !(PBlockComponent.getX() == Constants.COLUMNS-2 || ContainerComponent.detectNCollision(x+2, y));
                } break;
                case 2:
                case 3:
                case 4:
                case 5:
                case 6: {
                    PBlockComponent.ALLOW_LEFT = !(PBlockComponent.getX() == 1 || ContainerComponent.detectNCollision(x-2, y));
                    PBlockComponent.ALLOW_RIGHT = !(PBlockComponent.getX() == Constants.COLUMNS-2 || ContainerComponent.detectNCollision(x+2, y));
                } break;
                case 7: {
                    PBlockComponent.ALLOW_LEFT = !(PBlockComponent.getX() == 1 || ContainerComponent.detectNCollision(x-2, y));
                    PBlockComponent.ALLOW_RIGHT = !(PBlockComponent.getX() == Constants.COLUMNS-3 || ContainerComponent.detectNCollision(x+3, y));
                } break;
                // Grupos rotacionados
                case 8:
                case 12:
                case 15: {
                    PBlockComponent.ALLOW_LEFT = !(PBlockComponent.getX() == 1 || ContainerComponent.detectNCollision(x-2, y));
                    PBlockComponent.ALLOW_RIGHT = !(PBlockComponent.getX() == Constants.COLUMNS-1);
                } break;
                case 9:
                case 10:
                case 13: {
                    PBlockComponent.ALLOW_LEFT = !(PBlockComponent.getX() == 0);
                    PBlockComponent.ALLOW_RIGHT = !(PBlockComponent.getX() == Constants.COLUMNS-2 || ContainerComponent.detectNCollision(x+2, y));
                } break;
                case 11:
                case 14: {
                    PBlockComponent.ALLOW_LEFT = !(PBlockComponent.getX() == 1 || ContainerComponent.detectNCollision(x-2, y));
                    PBlockComponent.ALLOW_RIGHT = !(PBlockComponent.getX() == Constants.COLUMNS-2 || ContainerComponent.detectNCollision(x+2, y));
                } break;
                case 16: {
                    PBlockComponent.ALLOW_LEFT = !(PBlockComponent.getX() == 0);
                    PBlockComponent.ALLOW_RIGHT = !(PBlockComponent.getX() == Constants.COLUMNS-1);
                } break;
                default: break;
            }
        }
    }

    // Regra 98 - Resetar posicao ao continuar
    private static rule98(): void {
        Game.rule99();
        // Se continua, adquire padrao aleatorio e ajusta posicao y
        Game.gPattern = RNGService.randomInt(1, 16); //this.iniPattern;
        switch (Game.gPattern) {
            case 4:
            case 5:
            case 6:
            case 8:
            case 9:
            case 10:
            case 12:
            case 13:
            case 15:
            case 16: Game.start_py = -2; break;
            default: Game.start_py = -1; break;
        }
        // Posicao inicial
        PBlockComponent.setX(Game.start_px);
        PBlockComponent.setY(Game.start_py);
    }

    // Regra 99 - Finalizar jogo ou adicionar mais blocos
    private static rule99(): void {
        var blocksPos: number[][] = ContainerComponent.getBlocksPos();
        var flag: boolean = false;
        for (var i in blocksPos) {
            if (blocksPos[i][1] == 0) {
                flag = true;
                break;
            }
        }
        if (flag) {
            Game.stop();
        } else {
            Game.rule1();
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
                if (!this.gameOver) {
                    Game.rule4();
                    ContainerComponent.setBlocksPos();
                    Game.timedMoves();
                    Game.rule3();
                    for (var line: number = 0; line < Constants.LINES; line++) {
                        Game.rule2(line);
                    }
                    //LogService.log(ContainerComponent.getBlocksPos());
                    ContainerComponent.eraseBlocksPos();
                }
            });
    }

    static stop(): void {
        LogService.log("(game over)");
        this.gameOver = true;
        Game.timerSubscription.unsubscribe();
        this.gameOver = false;
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

    // Getters adicionais
    static getLargerGroup(): boolean {
        return Game.largerGroup;
    }
    static getGroupPattern(): number {
        return Game.gPattern;
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
}
