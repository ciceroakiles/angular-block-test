import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Game, Constants } from '../../game';
import { LogService } from '../../../service/log.service';

@Component({
  selector: 'app-container-0',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {
  // Variavel de referencia ao elemento DOM
  @ViewChild('containerDOM', { static: true }) container!: ElementRef;

  // Outras variaveis
  private static matrix: number[][];
  private static blocksPos: number[][] = [];

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
    LogService.log("quit 0");
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
    for (var i: number = 0; i < ContainerComponent.blocksPos.length; i++) {
      col = ContainerComponent.blocksPos[i][0];
      line = ContainerComponent.blocksPos[i][1];
      // Verifica ultima linha
      if (line != Constants.LINES-1) {
        nextLine = line + 1;
      } else {
        // Permissao de loop vertical
        nextLine = (Constants.LOOP_V ? 0 : line);
      }
      // Se nao ha colisoes, prossegue
      if (ContainerComponent.noCollisions(col, nextLine)) {
        ContainerComponent.remFromMatrix(col, line);
        ContainerComponent.blocksPos[i][1] = nextLine;
      }
    }
    ContainerComponent.updateMatrix();
    //LogService.log(ContainerComponent.blocksPos);
  }

  // Detecta se nao ha nenhum dos dois tipos de colisao
  static noCollisions(x: number, y: number): boolean {
    return (!ContainerComponent.detectNCollision(x, y) && !ContainerComponent.detectPCollision(x, y));
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

  // Atualiza a matriz
  static updateMatrix(): void {
    for (var i in ContainerComponent.blocksPos) {
      this.addToMatrix(ContainerComponent.blocksPos[i][0], ContainerComponent.blocksPos[i][1]);
    }
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
