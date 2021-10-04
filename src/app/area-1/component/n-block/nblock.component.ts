import { Component, OnInit } from '@angular/core';
// Extras
import { ElementRef, Input, ViewChild } from '@angular/core';
// Outros elementos de projeto
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-nblock-1',
  templateUrl: './nblock.component.html',
  styleUrls: ['nblock.component.css'],
})
export class NBlockComponent implements OnInit {
  // Variavel de referencia ao elemento DOM
  @ViewChild('nblockDOM', { static: true }) block!: ElementRef;

  // Outras variaveis
  @Input() x?: number;    // Posicao X
  @Input() y?: number;    // Posicao Y

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
    this.block.nativeElement.style.marginLeft = `${this.x}vw`;
    this.block.nativeElement.style.marginTop = `${this.y}vw`;
  }

}
