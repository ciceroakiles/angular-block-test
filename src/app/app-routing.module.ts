import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Componentes
import { BoxTestComponent as BoxTestComponent0 } from './area-0/component/box/box-test.component';
import { BoxTestComponent as BoxTestComponent1 } from './area-1/component/box/box-test.component';

// Rotas
const routes: Routes = [
  { path: 'area-0', component: BoxTestComponent0 },
  { path: 'area-1', component: BoxTestComponent1 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
