import { Component, OnInit } from '@angular/core';
// Extras
import { ElementRef, ViewChild } from '@angular/core';
// Outros elementos de projeto
import { Constants } from '../../common/constants';
import { TimerService } from '../../common/timer.service';
import { PBlockComponent } from 'src/app/area-1/area-1.module';
import { LogService } from 'src/app/logger/log.service';

@Component({
  selector: 'app-container-0',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
  //template: `` // Testes de template
})
export class ContainerComponent implements OnInit {
  // Variavel de referencia ao elemento DOM
  @ViewChild('containerDOM', { static: true }) container!: ElementRef;

  // Outras variaveis
  static matrix: number[][];
  static blocksPos: number[][] = [];

  constructor() { }

  ngOnInit(): void {
    // Dimensoes
    this.container.nativeElement.style.width = `${Constants.BOX_W}vw`;
    this.container.nativeElement.style.height = `${Constants.BOX_H}vw`;
    ContainerComponent.initMatrix();
    //this.printMatrix();
    TimerService.start();
  }

  // Evita duplicacao de timers
  ngOnDestroy(): void {
    TimerService.stop();
  }

  // Blocos iniciais
  static initialBlocks(): void {
    
  }

  // Encontra as posicoes de cada bloco
  static getBlocksPos(): void {
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
    return ((PBlockComponent.getX() == x && PBlockComponent.getY() == y) && Constants.COLLIDE_N_TO_P);
  }

  // Deteccao de colisao (n-block -> n-block)
  static detectNCollision(x: number, y: number): boolean {
    return ((this.getMatrixValue(x, y) == 1) && Constants.COLLIDE_N_TO_N);
  }

  // Inicializacao da matriz
  static initMatrix(): void {
    ContainerComponent.matrix = [];
    for (var i: number = 0; i < Constants.COLUMNS; i++) {
      ContainerComponent.matrix[i] = [];
      for (var j: number = 0; j < Constants.LINES; j++) {
        ContainerComponent.matrix[i][j] = 0;
      }
    }
    ContainerComponent.initialBlocks();
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
