import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  vistaActual: string = ''; 
  mostrarMenu: boolean = false;

  mostrarVista(vista: string): void {
    this.vistaActual = vista;
    this.mostrarMenu = false;
  }
}