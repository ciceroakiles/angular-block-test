import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// Componentes
import { AppComponent } from './app.component';
import { BlockTestComponent as BlockTestComponent0 } from './area-0/component/block/block-test.component';
import { BoxTestComponent as BoxTestComponent0 } from './area-0/component/box/box-test.component';
import { BlockTestComponent as BlockTestComponent1 } from './area-1/component/block/block-test.component';
import { BoxTestComponent as BoxTestComponent1 } from './area-1/component/box/box-test.component';

@NgModule({
  declarations: [
    AppComponent,
    BlockTestComponent0, BoxTestComponent0,
    BlockTestComponent1, BoxTestComponent1
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
