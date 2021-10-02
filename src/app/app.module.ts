import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// Componentes
import { AppComponent } from './app.component';
import { PBlockComponent as PBlock0 } from './area-0/component/p-block/pblock.component';
import { ContainerComponent as Container0 } from './area-0/component/container/container.component';
import { PBlockComponent as PBlock1 } from './area-1/component/p-block/pblock.component';
import { ContainerComponent as Container1 } from './area-1/component/container/container.component';

@NgModule({
  declarations: [
    AppComponent,
    PBlock0, Container0,
    PBlock1, Container1
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
