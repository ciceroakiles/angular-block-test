import { Component, OnInit } from '@angular/core';
// Extras
import { ElementRef, ViewChild } from '@angular/core';
import { Constants } from '../../common/constants';

@Component({
  selector: 'app-box-test0',
  templateUrl: './box-test.component.html',
  styleUrls: ['./box-test.component.css']
})
export class BoxTestComponent implements OnInit {
  // Variavel de referencia ao elemento DOM
  @ViewChild('boxDOM', { static: true }) boxTest!: ElementRef;

  constructor() { }
  
  ngOnInit(): void {
    // Inicializacao (altera CSS)
    this.boxTest.nativeElement.style.width = `${Constants.BOX_W}vw`;
    this.boxTest.nativeElement.style.height = `${Constants.BOX_H}vw`;
  }

}
