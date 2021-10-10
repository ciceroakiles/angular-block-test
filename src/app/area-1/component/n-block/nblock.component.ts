import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Game, Constants } from '../../game';

@Component({
  selector: 'app-nblock-1',
  templateUrl: './nblock.component.html',
  styleUrls: ['nblock.component.css'],
})
export class NBlockComponent implements OnInit {
  // Variavel de referencia ao elemento DOM
  @ViewChild('nblockDOM', { static: true }) block!: ElementRef;

  // Outras variaveis
  @Input() x?: number;        // Posicao X
  @Input() y?: number;        // Posicao Y
  @Input() follow?: boolean;  // Seguir

  constructor() { }

  // Inicializacao (altera CSS)
  ngOnInit(): void {
    // Dimensoes
    this.block.nativeElement.style.width = `${Constants.BLOCK_W}vw`;
    this.block.nativeElement.style.height = `${Constants.BLOCK_H}vw`;
    // Posicionamento
    this.x! *= Constants.BLOCK_W;
    this.y! *= Constants.BLOCK_H;
  }

  // CSS update
  ngDoCheck(): void {
    var x = this.x!, y = this.y!;
    if (this.follow) {
      x += (Game.getPBlockCompX() * Constants.BLOCK_W);
      y += (Game.getPBlockCompY() * Constants.BLOCK_H);
    }
    this.block.nativeElement.style.marginLeft = `${x}vw`;
    this.block.nativeElement.style.marginTop = `${y}vw`;
    if (this.follow) {
      if (y < 0) {
        this.turnInvisible(); //this.visibilityTest1();
      } else {
        this.turnVisible(); //this.visibilityTest2();
      }
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

}
