import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Componentes
import { ContainerComponent } from '../component/container/container.component';
import { PBlockComponent } from '../component/p-block/pblock.component';
export { ContainerComponent } from '../component/container/container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ContainerComponent,
    PBlockComponent
  ],
  exports: [
    ContainerComponent
  ]
})
export class Area1Module { }
