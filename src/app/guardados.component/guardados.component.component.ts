import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../actividad.service';  // Asegúrate de importar el servicio

@Component({
  selector: 'app-proyectos-guardados',
  templateUrl: './guardados.component.component.html',
  styleUrls: ['./guardados.component.component.css']
})
export class ProyectosGuardadosComponent implements OnInit {
  proyectosGuardados: any[] = []; 
  actividadesGuardadas: any[] = [];
  proyectoSeleccionado: any = null;
  errorMessage: string = '';

  constructor(private actividadService: ActividadService) {}

  ngOnInit(): void {
    this.obtenerProyectosGuardados();
  }

  obtenerProyectosGuardados(): void {
    this.actividadService.obtenerProyectos().subscribe(
      (data) => {
        this.proyectosGuardados = data;  
        console.log('Proyectos guardados:', this.proyectosGuardados);
      },
      (error) => {
        this.errorMessage = 'Hubo un error al obtener los proyectos guardados: ' + error.message;
        console.error(this.errorMessage);
      }
    );
  }

  obtenerActividadesPorProyecto(proyectoId: number): void {
    this.actividadService.obtenerActividadesPorProyecto(proyectoId).subscribe(
      (data) => {
        this.actividadesGuardadas = data; 
        console.log('Actividades del proyecto seleccionado:', this.actividadesGuardadas);
      },
      (error) => {
        this.errorMessage = 'Hubo un error al obtener las actividades del proyecto: ' + error.message;
        console.error(this.errorMessage);
      }
    );
  }

  onProyectoSeleccionado(proyectoId: number): void {
    this.proyectoSeleccionado = this.proyectosGuardados.find(proyecto => proyecto.id === proyectoId);
    this.obtenerActividadesPorProyecto(proyectoId);
  }
}
