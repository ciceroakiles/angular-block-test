import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Game, Constants } from '../../game';

@Component({
  selector: 'app-nblock-0',
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
  }

}
