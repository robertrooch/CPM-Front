import { Component } from '@angular/core';
import { ActividadService } from '../actividad.service';

interface Actividad {
  nombre: string;
  duracion: number;
  predecesores: string;
}

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html'
})
export class ActividadComponent {
  actividades: Actividad[] = [];

  constructor(private actividadService: ActividadService) {}

  nuevaActividad() {
    this.actividades.push({ nombre: '', duracion: 0, predecesores: '' });
  }

  eliminarActividad(index: number) {
    this.actividades.splice(index, 1);
  }

  guardarActividades() {
    this.actividades.forEach(actividad => {
      this.actividadService.agregarActividad(actividad).subscribe({
        next: (response) => {
          console.log('Actividad guardada:', response);
        },
        error: (error) => {
          console.error('Error al guardar actividad:', error);
        }
      });
    });
  }
}
