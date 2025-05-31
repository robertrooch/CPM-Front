import { Component } from '@angular/core';
import { ActividadService } from '../actividad.service';

interface Actividad {
  nombre: string;
  tiempoOptimista: number;
  tiempoMasProbable: number;
  tiempoPesimista: number;
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
    this.actividadService.limpiarActividades().subscribe({
      next: () => {
        this.actividades.push({
          nombre: '',
          tiempoOptimista: 0,
          tiempoMasProbable: 0,
          tiempoPesimista: 0,
          predecesores: '',
        });
      },
    });
  }
  

  eliminarActividad(index: number) {
    this.actividades.splice(index, 1);
  }

  guardarActividades() {
    this.actividadService.limpiarActividades().subscribe({
      next: () => {
        console.log('Actividades limpiadas en el backend');
        
        this.actividades.forEach(actividad => {
          const payload = {
            nombre: actividad.nombre,
            tiempoOptimista: actividad.tiempoOptimista,
            tiempoMasProbable: actividad.tiempoMasProbable,
            tiempoPesimista: actividad.tiempoPesimista,
            predecesores: actividad.predecesores
          };
      
          this.actividadService.agregarActividad(payload).subscribe({
            next: (response) => {
              console.log('Actividad guardada:', response);
            },
          });
        });
      },
    });
  }
  
  
}
