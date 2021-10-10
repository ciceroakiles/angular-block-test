import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Outros componentes e modulos
import { LogService } from './service/log.service';
import { RNGService } from './service/rng.service';
import { Area0Module } from './area-0/area-0.module';
import { Area1Module } from './area-1/area-1.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Area0Module,
    Area1Module
  ],
  providers: [LogService, RNGService],
  bootstrap: [AppComponent]
})
export class AppModule { }
