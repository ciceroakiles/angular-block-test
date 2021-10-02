import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Componentes
import { ContainerComponent as Container0 } from './area-0/component/container/container.component';
import { ContainerComponent as Container1 } from './area-1/component/container/container.component';

// Rotas
const routes: Routes = [
  { path: 'area-0', component: Container0 },
  { path: 'area-1', component: Container1 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
