import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Componentes
import { Area0Module, ContainerComponent as Container0 } from './area-0/area-0.module';
import { Area1Module, ContainerComponent as Container1 } from './area-1/area-1.module';

// Rotas
const routes: Routes = [
  { path: 'area-0', component: Container0 },
  { path: 'area-1', component: Container1 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), Area0Module, Area1Module],
  exports: [RouterModule]
})
export class AppRoutingModule { }
