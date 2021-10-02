import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core'; // Extras

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['block.component.css'],
  host: { '(document:keydown)': 'keydown($event)' } // Listener
})
export class BlockComponent implements OnInit {
  // Variavel de referencia ao elemento DOM
  @ViewChild('blockDOM', { static: true }) blockTest!: ElementRef;

  // Constantes
  readonly MIN_X = 0;
  readonly MIN_Y = 0;
  readonly MAX_X = 28;
  readonly MAX_Y = 28;

  // Outras variaveis
  key?: string;           // Tecla pressionada
  x?: number;             // Posicao X
  y?: number;             // Posicao Y
  loopH: boolean = true;  // Permitir loop horizontal
  loopV: boolean = true;  // Permitir loop vertical

  constructor() { }

  lowerLeft(): void {
    this.x = this.MIN_X;
    this.y = this.MAX_Y;
  }

  lowerRight(): void {
    this.x = this.MAX_X;
    this.y = this.MAX_Y;
  }

  upperLeft(): void {
    this.x = this.MIN_X;
    this.y = this.MIN_Y;
  }

  upperRight(): void {
    this.x = this.MAX_X;
    this.y = this.MIN_Y;
  }

  ngOnInit(): void {
    // Inicializacao
    this.lowerLeft();
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
    if (this.y! > this.MIN_Y) {
      this.y! -= 4;
    } else {
      if (this.loopV) this.y! = this.MAX_Y;
    }
  }

  moveDown(): void {
    this.key = "down";
    if (this.y! < this.MAX_Y) {
      this.y! += 4;
    } else {
      if (this.loopV) this.y! = this.MIN_Y;
    }
  }

  moveLeft(): void {
    this.key = "left";
    if (this.x! > this.MIN_X) {
      this.x! -= 4;
    } else {
      if (this.loopH) this.x! = this.MAX_X;
    }
  }

  moveRight(): void {
    this.key = "right";
    if (this.x! < this.MAX_X) {
      this.x! += 4;
    } else {
      if (this.loopH) this.x! = this.MIN_X;
    }
  }

}
