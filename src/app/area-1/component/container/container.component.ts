import { Component, OnInit } from '@angular/core';
// Extras
import { ElementRef, ViewChild } from '@angular/core';
// Outros elementos de projeto
import { Constants } from '../../common/constants';
import { Game } from '../../common/game';
import { LogService } from 'src/app/logger/log.service';

@Component({
  selector: 'app-container-1',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
  //template: `` // Testes de template
})
export class ContainerComponent implements OnInit {
  // Variavel de referencia ao elemento DOM em ngOnInit
  @ViewChild('containerDOM', { static: true }) container!: ElementRef;
  
  // Outras variaveis
  private static matrix: any; //number[][];
  private static blocksPos: number[][] = [];
  private static start_px: number;
  private static start_py: number;

  constructor() { }

  ngOnInit(): void {
    // Dimensoes
    this.container.nativeElement.style.width = `${Constants.BOX_W}vw`;
    this.container.nativeElement.style.height = `${Constants.BOX_H}vw`;
    ContainerComponent.initMatrix();
    Game.start();
  }

  // Evita duplicacao de timers
  ngOnDestroy(): void {
    Game.stop();
  }

  // Setter posicao X inicial (p-block)
  static setInitialPBlockX(x: number): void {
    ContainerComponent.start_px = x;
  }

  // Setter posicao Y inicial (p-block)
  static setInitialPBlockY(y: number): void {
    ContainerComponent.start_py = y;
  }

  // Getter posicao X inicial (p-block)
  static getInitialPBlockX(): number {
    return ContainerComponent.start_px;
  }

  // Getter posicao Y inicial (p-block)
  static getInitialPBlockY(): number {
    return ContainerComponent.start_py;
  }

  // Encontra as posicoes de cada bloco
  static setBlocksPos(): void {
    for (var i: number = 0; i < Constants.COLUMNS; i++) {
      for (var j: number = 0; j < Constants.LINES; j++) {
        if (ContainerComponent.matrix[i][j] == 1) {
          ContainerComponent.blocksPos.push([i, j]);
        }
      }
    }
    // Logging
    //LogService.log(PBlockComponent.getX() + " " + PBlockComponent.getY());
    //LogService.log(ContainerComponent.blocksPos);
  }

  // Retorna as posicoes
  static getBlocksPos(): number[][] {
    return ContainerComponent.blocksPos;
  }

  // Esquece as posicoes para atualizar sem acumular repeticoes
  static eraseBlocksPos(): void {
    ContainerComponent.blocksPos = [];
  }

  // Gravidade
  static gravity(): void {
    var col, line, nextLine: number = 0;
    for (var j: number = 0; j < ContainerComponent.blocksPos.length; j++) {
      col = ContainerComponent.blocksPos[j][0];
      line = ContainerComponent.blocksPos[j][1];
      // Verifica ultima linha
      if (line != Constants.LINES-1) {
        nextLine = line + 1;
      } else {
        // Permissao de loop vertical
        nextLine = (Constants.LOOP_V ? 0 : line);
      }
      // Se nao ha colisoes, prossegue
      if (!ContainerComponent.detectNCollision(col, nextLine)) {
        if (!ContainerComponent.detectPCollision(col, nextLine)) {
          ContainerComponent.remFromMatrix(col, line);
          ContainerComponent.blocksPos[j][1] = nextLine;
        }
      }
    }
    // Atualiza a matriz
    for (var i in ContainerComponent.blocksPos) {
      col = ContainerComponent.blocksPos[i][0];
      line = ContainerComponent.blocksPos[i][1];
      this.addToMatrix(col, line);
    }
    // Logging
    //LogService.log(ContainerComponent.blocksPos);
  }

  // Deteccao de colisao (n-block -> p-block)
  static detectPCollision(x: number, y: number): boolean {
    return ((Game.getPBlockCompX() == x && Game.getPBlockCompY() == y) && Constants.COLLIDE_N_TO_P);
  }

  // Deteccao de colisao (n-block -> n-block)
  static detectNCollision(x: number, y: number): boolean {
    return ((this.getMatrixValue(x, y) == 1) && Constants.COLLIDE_N_TO_N);
  }

  // Inicializacao da matriz
  static initMatrix(): void {
    let max = (Constants.LINES > Constants.COLUMNS ? Constants.LINES : Constants.COLUMNS);
    ContainerComponent.matrix = Array.from(Array(max), () => new Array(max));
    for (var i: number = 0; i < Constants.COLUMNS; i++) {
      for (var j: number = 0; j < Constants.LINES; j++) {
        ContainerComponent.matrix[i][j] = 0;
      }
    }
    //this.printMatrix();
  }

  // Adiciona bloco
  static addToMatrix(i: number, j: number): void {
    ContainerComponent.matrix[i][j] = 1;
  }

  // Remove bloco
  static remFromMatrix(i: number, j: number) {
    ContainerComponent.matrix[i][j] = 0;
  }

  // Para componente div com ngIf
  getMatrix(): number[][] {
    return ContainerComponent.matrix;
  }

  // Para componente div com ngIf
  getMatrixValue(i: number, j: number): number {
    return ContainerComponent.matrix[i][j];
  }

  // Para deteccao de colisao (p-block)
  static getMatrixValue(i: number, j: number): number {
    return ContainerComponent.matrix[i][j];
  }

  // Logging
  printMatrix(): void {
    for (var i: number = 0; i < Constants.COLUMNS; i++) {
      for (var j: number = 0; j < Constants.LINES; j++) {
        LogService.log("> i=" + i + " | j=" + j + " | value=" + ContainerComponent.matrix[i][j]);
      }
    }
  }

}
