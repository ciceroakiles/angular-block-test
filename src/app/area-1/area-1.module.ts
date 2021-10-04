import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Componentes
import { ContainerComponent } from './component/container/container.component';
import { NBlockComponent } from './component/n-block/nblock.component';
import { PBlockComponent } from './component/p-block/pblock.component';
export { ContainerComponent } from './component/container/container.component';
export { PBlockComponent } from './component/p-block/pblock.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ContainerComponent,
    NBlockComponent,
    PBlockComponent
  ],
  exports: [
    ContainerComponent,
    PBlockComponent
  ]
})
export class Area1Module { }
