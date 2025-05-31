import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../actividad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent {
  proyecto: any = {
    nombre: '',
    descripcion: ''
  };
  errorMessage: string = ''; 
  successMessage: string = '';

  constructor(private ActividadService: ActividadService, private router: Router) {}

  guardarProyecto(): void {
    this.ActividadService.crearProyecto(this.proyecto).subscribe(
      (data) => {
        this.successMessage = 'Proyecto guardado exitosamente!';
        this.errorMessage = '';
        this.proyecto = { nombre: '', descripcion: '' };
        console.log('Proyecto guardado:', data);
      },
      (error) => {
        this.errorMessage = 'Hubo un error al guardar el proyecto: ' + error.message;
        this.successMessage = '';
        console.error(this.errorMessage);
      }
    );
  }
}