import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ActividadComponent } from './actividad/actividad.component';
import { DiagramaComponent } from './diagrama/diagrama.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProyectosGuardadosComponent } from './guardados.component/guardados.component.component';
import { ProyectoComponent } from './proyecto/proyecto.component';
import { RouterModule } from '@angular/router'; 

@NgModule({
  declarations: [
    AppComponent,
    ActividadComponent,
    DiagramaComponent,
    EncabezadoComponent,
    ProyectosGuardadosComponent,
    ProyectoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
