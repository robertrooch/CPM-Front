import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActividadComponent } from './actividad/actividad.component';
import { DiagramaComponent } from './diagrama/diagrama.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ActividadComponent,
    DiagramaComponent,
    EncabezadoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
