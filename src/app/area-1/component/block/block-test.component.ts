import { Component, OnInit } from '@angular/core';
// Extras
import { ElementRef, ViewChild } from '@angular/core';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-block-test1',
  templateUrl: './block-test.component.html',
  styleUrls: ['block-test.component.css'],
  host: { '(document:keydown)': 'keydown($event)' } // Listener
})
export class BlockTestComponent implements OnInit {
  // Variavel de referencia ao elemento DOM
  @ViewChild('blockDOM', { static: true }) blockTest!: ElementRef;

  // Outras variaveis
  key?: string;           // Tecla pressionada
  x?: number;             // Posicao X
  y?: number;             // Posicao Y

  constructor() { }

  lowerLeft(): void {
    this.x = Constants.MIN_X;
    this.y = Constants.MAX_Y;
  }

  lowerRight(): void {
    this.x = Constants.MAX_X;
    this.y = Constants.MAX_Y;
  }

  upperLeft(): void {
    this.x = Constants.MIN_X;
    this.y = Constants.MIN_Y;
  }

  upperRight(): void {
    this.x = Constants.MAX_X;
    this.y = Constants.MIN_Y;
  }

  ngOnInit(): void {
    // Inicializacao (altera CSS)
    this.blockTest.nativeElement.style.width = `${Constants.BLOCK_W}vw`;
    this.blockTest.nativeElement.style.height = `${Constants.BLOCK_H}vw`;
    this.upperLeft();
  }

  ngDoCheck(): void {
    // CSS update
    this.blockTest.nativeElement.style.marginLeft = `${this.x}vw`;
    this.blockTest.nativeElement.style.marginTop = `${this.y}vw`;
  }

  keydown(event: KeyboardEvent): void {
    // Movimentacoes
    switch (event.key) {
      case "ArrowUp":    this.moveUp();    break;
      case "ArrowDown":  this.moveDown();  break;
      case "ArrowLeft":  this.moveLeft();  break;
      case "ArrowRight": this.moveRight(); break;
      default: this.key = ""; break;
    }
    // Logging
    console.log("> key=" + this.key + " | posX=" + this.x + " | posY=" + this.y);
  }

  moveUp(): void {
    this.key = "up";
    if (this.y! > Constants.MIN_Y) {
      this.y! -= Constants.BLOCK_H;
    } else {
      if (Constants.LOOP_V) this.y! = Constants.MAX_Y;
    }
  }

  moveDown(): void {
    this.key = "down";
    if (this.y! < Constants.MAX_Y) {
      this.y! += Constants.BLOCK_H;
    } else {
      if (Constants.LOOP_V) this.y! = Constants.MIN_Y;
    }
  }

  moveLeft(): void {
    this.key = "left";
    if (this.x! > Constants.MIN_X) {
      this.x! -= Constants.BLOCK_W;
    } else {
      if (Constants.LOOP_H) this.x! = Constants.MAX_X;
    }
  }

  moveRight(): void {
    this.key = "right";
    if (this.x! < Constants.MAX_X) {
      this.x! += Constants.BLOCK_W;
    } else {
      if (Constants.LOOP_H) this.x! = Constants.MIN_X;
    }
  }

}
