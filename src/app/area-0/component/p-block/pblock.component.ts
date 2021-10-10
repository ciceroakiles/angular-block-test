import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Game, Constants } from '../../game';
import { LogService } from '../../../service/log.service';

@Component({
  selector: 'app-pblock-0',
  templateUrl: './pblock.component.html',
  styleUrls: ['pblock.component.css'],
  host: { '(document:keyup)': 'keyup($event)' } // Listener
})
export class PBlockComponent implements OnInit {
  // Variavel de referencia ao elemento DOM
  @ViewChild('pblockDOM', { static: true }) block!: ElementRef;

  // Outras variaveis
  private static sx?: number;
  private static sy?: number;
  private static key?: string;

  static ALLOW_UP: boolean = true;
  static ALLOW_DOWN: boolean = true;
  static ALLOW_LEFT: boolean = true;
  static ALLOW_RIGHT: boolean = true;

  constructor() { }

  // Inicializacao (altera CSS)
  ngOnInit(): void {
    // Dimensoes
    this.block.nativeElement.style.width = `${Constants.BLOCK_W}vw`;
    this.block.nativeElement.style.height = `${Constants.BLOCK_H}vw`;
    // Posicionamento
    PBlockComponent.sx = Constants.BLOCK_W * Game.getInitialPBlockX();
    PBlockComponent.sy = Constants.BLOCK_H * Game.getInitialPBlockY();
  }

  // CSS update
  ngDoCheck(): void {
    this.block.nativeElement.style.marginLeft = `${PBlockComponent.sx}vw`;
    this.block.nativeElement.style.marginTop = `${PBlockComponent.sy}vw`;
    if (PBlockComponent.sy! < 0) {
      this.turnInvisible(); //this.visibilityTest2();
    } else {
      this.turnVisible(); //this.visibilityTest1();
    }
  }

  // Alteracoes no CSS
  turnVisible(): void {
    this.block.nativeElement.style.background = "gray";
    this.block.nativeElement.style.border = "1px solid white";
  }
  turnInvisible(): void {
    this.block.nativeElement.style.background = "black";
    this.block.nativeElement.style.border = "none";
  }

  // Metodos para testes de visibilidade
  visibilityTest1(): void {
    this.block.nativeElement.style.background = "blue";
    this.block.nativeElement.style.border = "1px solid white";
  }
  visibilityTest2(): void {
    this.block.nativeElement.style.background = "red";
    this.block.nativeElement.style.border = "1px solid white";
  }

  // Setter posicao X
  static setX(x: number): void {
    PBlockComponent.sx = Constants.BLOCK_W * x;
  }

  // Setter posicao Y
  static setY(y: number): void {
    PBlockComponent.sy = Constants.BLOCK_H * y;
  }

  // Getter posicao X
  static getX(): number {
    return (PBlockComponent.sx! / Constants.BLOCK_W);
  }

  // Getter posicao Y
  static getY(): number {
    return (PBlockComponent.sy! / Constants.BLOCK_H);
  }

  // Getter tecla
  static getKey(): string {
    return PBlockComponent.key!;
  }

  // Setter tecla
  static setKey(s: string): void {
    PBlockComponent.key = s;
  }

  // Gravidade
  static gravity(): void {
    if (!PBlockComponent.detectCollision(0, 1)) PBlockComponent.moveDown();
    //PBlockComponent.printMove();
  }

  // Deteccao de colisoes
  static detectCollision(x: number, y: number): boolean {
    let i = x + PBlockComponent.getX();
    let j = y + PBlockComponent.getY();
    return ((Game.getContainerMatrixValue(i, j) == 1) && Constants.COLLIDE_P_TO_N);
  }

  // Movimentacoes via teclas
  keyup(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowUp": {
        PBlockComponent.key = "UP";
        if (PBlockComponent.ALLOW_UP) {
          if (!Constants.AUTO_MOVE) PBlockComponent.moveUp();
        }
      } break;
      case "ArrowDown": {
        PBlockComponent.key = "DOWN";
        if (PBlockComponent.ALLOW_DOWN) {
          if (!Constants.AUTO_MOVE) PBlockComponent.moveDown();
        }
      } break;
      case "ArrowLeft": {
        PBlockComponent.key = "LEFT";
        if (PBlockComponent.ALLOW_LEFT) {
          if (!Constants.AUTO_MOVE) PBlockComponent.moveLeft();
        }
      } break;
      case "ArrowRight": {
        PBlockComponent.key = "RIGHT";
        if (PBlockComponent.ALLOW_RIGHT) {
          if (!Constants.AUTO_MOVE) PBlockComponent.moveRight();
        }
      } break;
      default: if (Constants.CAN_STOP) PBlockComponent.key = ""; break;
    }
    //PBlockComponent.printMove();
  }

  // Movimento automatico
  static autoMove(): void {
    switch (PBlockComponent.getKey()) {
      case "UP":    PBlockComponent.moveUp();    break;
      case "DOWN":  PBlockComponent.moveDown();  break;
      case "LEFT":  PBlockComponent.moveLeft();  break;
      case "RIGHT": PBlockComponent.moveRight(); break;
      default: break;
    }
  }

  static moveUp(): void {
    if (!PBlockComponent.detectCollision(0, -1)) {
      PBlockComponent.key = "UP";
      if (PBlockComponent.sy != Constants.MIN_Y) {
        PBlockComponent.sy! -= Constants.BLOCK_H;
      } else if (Constants.LOOP_V) {
        PBlockComponent.sy = Constants.MAX_Y;
      }
    }
  }

  static moveDown(): void {
    if (!PBlockComponent.detectCollision(0, 1)) {
      if (!Constants.GRAVITY_P) PBlockComponent.key = "DOWN"; // Evita automov. dupla por gravidade
      if (PBlockComponent.sy != Constants.MAX_Y) {
        PBlockComponent.sy! += Constants.BLOCK_H;
      } else if (Constants.LOOP_V) {
        PBlockComponent.sy = Constants.MIN_Y;
      }
    }
  }

  static moveLeft(): void {
    if (!PBlockComponent.detectCollision(-1, 0)) {
      PBlockComponent.key = "LEFT";
      if (PBlockComponent.sx != Constants.MIN_X) {
        PBlockComponent.sx! -= Constants.BLOCK_W;
      } else if (Constants.LOOP_H) {
        PBlockComponent.sx! = Constants.MAX_X;
      }
    }
  }

  static moveRight(): void {
    if (!PBlockComponent.detectCollision(1, 0)) {
      PBlockComponent.key = "RIGHT";
      if (PBlockComponent.sx != Constants.MAX_X) {
        PBlockComponent.sx! += Constants.BLOCK_W;
      } else if (Constants.LOOP_H) {
        PBlockComponent.sx! = Constants.MIN_X;
      }
    }
  }

  // Logging
  static printMove(): void {
    LogService.log("> key=" + PBlockComponent.key + " | posX=" + PBlockComponent.sx + " | posY=" + PBlockComponent.sy);
  }

}
