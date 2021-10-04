import { Component, OnInit } from '@angular/core';
// Extras
import { ElementRef, Input, ViewChild } from '@angular/core';
// Outros elementos de projeto
import { Constants } from '../../common/constants';
import { ContainerComponent } from 'src/app/area-1/area-1.module';
import { LogService } from 'src/app/logger/log.service';

@Component({
  selector: 'app-pblock-1',
  templateUrl: './pblock.component.html',
  styleUrls: ['pblock.component.css'],
  host: { '(document:keydown)': 'keydown($event)' } // Listener
})
export class PBlockComponent implements OnInit {
  // Variavel de referencia ao elemento DOM
  @ViewChild('pblockDOM', { static: true }) block!: ElementRef;

  // Outras variaveis
  @Input() x?: number;    // Posicao X (tag)
  @Input() y?: number;    // Posicao Y (tag)
  static sx?: number;
  static sy?: number;
  static key?: string;

  constructor() { }

  // Inicializacao (altera CSS)
  ngOnInit(): void {
    // Dimensoes
    this.block.nativeElement.style.width = `${Constants.BLOCK_W}vw`;
    this.block.nativeElement.style.height = `${Constants.BLOCK_H}vw`;
    PBlockComponent.sx = this.x! * Constants.BLOCK_W;
    PBlockComponent.sy = this.y! * Constants.BLOCK_H;
  }

  // CSS update
  ngDoCheck(): void {
    this.block.nativeElement.style.marginLeft = `${PBlockComponent.sx}vw`;
    this.block.nativeElement.style.marginTop = `${PBlockComponent.sy}vw`;
  }

  static getX(): number {
    return (PBlockComponent.sx! / Constants.BLOCK_W);
  }

  static getY(): number {
    return (PBlockComponent.sy! / Constants.BLOCK_H);
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
    if (i == -1) i = Constants.COLUMNS-1;
    if (j == -1) j = Constants.LINES-1;
    if (i == Constants.COLUMNS) i = 0;
    if (j == Constants.LINES) j = 0;
    return ((ContainerComponent.getMatrixValue(i, j) == 1) && Constants.COLLIDE_P_TO_N);
  }

  // Movimentacoes
  keydown(event: KeyboardEvent): void {
    switch (event.key) {
      case "ArrowUp":    if (!PBlockComponent.detectCollision(0, -1)) PBlockComponent.moveUp();   break;
      case "ArrowDown":  if (!PBlockComponent.detectCollision(0, 1)) PBlockComponent.moveDown();  break;
      case "ArrowLeft":  if (!PBlockComponent.detectCollision(-1, 0)) PBlockComponent.moveLeft(); break;
      case "ArrowRight": if (!PBlockComponent.detectCollision(1, 0)) PBlockComponent.moveRight(); break;
      default: PBlockComponent.key = ""; break;
    }
    //PBlockComponent.printMove();
  }

  static moveUp(): void {
    PBlockComponent.key = "up";
    if (PBlockComponent.sy != Constants.MIN_Y) {
      PBlockComponent.sy! -= Constants.BLOCK_H;
    } else if (Constants.LOOP_V) {
      PBlockComponent.sy = Constants.MAX_Y;
    }
  }

  static moveDown(): void {
    PBlockComponent.key = "down";
    if (PBlockComponent.sy != Constants.MAX_Y) {
      PBlockComponent.sy! += Constants.BLOCK_H;
    } else if (Constants.LOOP_V) {
      PBlockComponent.sy = Constants.MIN_Y;
    }
  }

  static moveLeft(): void {
    PBlockComponent.key = "left";
    if (PBlockComponent.sx != Constants.MIN_X) {
      PBlockComponent.sx! -= Constants.BLOCK_W;
    } else if (Constants.LOOP_H) {
      PBlockComponent.sx! = Constants.MAX_X;
    }
  }

  static moveRight(): void {
    PBlockComponent.key = "right";
    if (PBlockComponent.sx != Constants.MAX_X) {
      PBlockComponent.sx! += Constants.BLOCK_W;
    } else if (Constants.LOOP_H) {
      PBlockComponent.sx! = Constants.MIN_X;
    }
  }

  static printMove(): void {
    LogService.log("> key=" + PBlockComponent.key + " | posX=" + PBlockComponent.sx + " | posY=" + PBlockComponent.sy);
  }

}
