import { Component, OnInit } from '@angular/core';
import { ActividadService } from '../actividad.service';
import * as joint from 'jointjs';

@Component({
  selector: 'app-diagrama',
  templateUrl: './diagrama.component.html'
})
export class DiagramaComponent implements OnInit {
  actividades: any[] = [];
  proyectos: any[] = [];
  selectedProyectoId: number = 1;
  graph: any;

  constructor(private actividadService: ActividadService) {}

  ngOnInit() {
    this.obtenerProyectos();
  }

  obtenerProyectos() {
    this.actividadService.obtenerProyectos().subscribe({
      next: (response) => {
        this.proyectos = response;
        console.log('Proyectos cargados:', this.proyectos);
      },
      error: (error) => {
        console.error('Error al obtener proyectos:', error);
      }
    });
  }

  generarDiagrama() {
    this.actividadService.calcularTiempos().subscribe({
      next: (response) => {
        this.actividades = response.actividades;
        console.log('Actividades calculadas:', this.actividades);
        this.renderizarDiagrama();
      },
      error: (error) => {
        console.error('Error al generar diagrama:', error);
      }
    });
  }

  guardarActividades() {
    if (!this.selectedProyectoId) {
      alert('Por favor selecciona un proyecto');
      return;
    }

    const actividadesConDatos = this.actividades.map(actividad => ({
      nombre: actividad.nombre,
      duracion: actividad.duracion,
      estart: actividad.estart,
      efinish: actividad.efinish,
      lstart: actividad.lstart,
      lfinish: actividad.lfinish,
      htotal: actividad.htotal,
      hlibre: actividad.hlibre,
      es_critica: actividad.htotal === 0,
      predecesores: actividad.predecesores,
      sucesores: actividad.sucesores
    }));

    this.actividadService.guardarCPM(this.selectedProyectoId, actividadesConDatos).subscribe({
      next: (response) => {
        console.log('Actividades CPM guardadas:', response);
      },
      error: (error) => {
        console.error('Error al guardar actividades CPM:', error);
      }
    });
  }

  renderizarDiagrama() {
    this.graph = new joint.dia.Graph();
  
    const paper = new joint.dia.Paper({
      el: document.getElementById('diagrama'),
      model: this.graph,
      width: 1000,
      height: 600,
      gridSize: 10
    });
  
    const elementos: any[] = [];
  
    const inicio = new joint.shapes.standard.Rectangle();
    inicio.position(10, 250);
    inicio.resize(150, 75 );
    inicio.attr({
      body: { fill: 'white' },
      label: {
        text: `0|0|0\nInicio\n0| |0`,
        fill: 'black'
      }
    });
    inicio.addTo(this.graph);
  
    this.actividades.forEach((actividad, index) => {
      const rect = new joint.shapes.standard.Rectangle();
      rect.position(150 + (index % 5) * 150, 50 + Math.floor(index / 5) * 100);
      rect.resize(150, 75);
      rect.attr({
        body: { fill: actividad.htotal <= 0 ? '#9bd9fa' : 'white' },
        label: {
          text: `${actividad.estart.toFixed(2)}|${actividad.duracion.toFixed(2)}|${actividad.efinish.toFixed(2)}\n${actividad.nombre}\n${actividad.lstart.toFixed(2)}|${actividad.htotal.toFixed(2)}/${actividad.hlibre.toFixed(2)}|${actividad.lfinish.toFixed(2)}`,
          fill: 'black'
        }
      });
      rect.addTo(this.graph);
  
      actividad.element = rect;
      elementos.push(rect);
    });
  
    this.actividades.forEach((actividad) => {
      if (!actividad.predecesores || actividad.predecesores.length === 0 || (Array.isArray(actividad.predecesores) && actividad.predecesores[0] === "")) {
        const link = new joint.shapes.standard.Link();
        link.source(inicio);
        link.target(actividad.element);
        link.addTo(this.graph);
      }
    });
  
    const fin = new joint.shapes.standard.Rectangle();
    fin.position(850, 250);
    fin.resize(150, 75);
    fin.attr({
      body: { fill: 'white' },
      label: {
        text: `${this.actividades.reduce((max, act) => Math.max(max, act.efinish), 0).toFixed(2)}|0|${this.actividades.reduce((max, act) => Math.max(max, act.efinish), 0).toFixed(2)}\nFin\n| |`,
        fill: 'black'
      }
    });
    fin.addTo(this.graph);
  
    this.actividades.forEach((actividad) => {
      if (!actividad.sucesores || actividad.sucesores.length === 0) {
        const link = new joint.shapes.standard.Link();
        link.source(actividad.element);
        link.target(fin);
        link.addTo(this.graph);
      }
    });
  
    this.actividades.forEach((actividad) => {
      if (actividad.predecesores && actividad.predecesores.length > 0) {
        actividad.predecesores.forEach((predecesorNombre: string) => {
          const predecesor = this.actividades.find((act) => act.nombre === predecesorNombre);
          if (predecesor) {
            const link = new joint.shapes.standard.Link();
            link.source(predecesor.element);
            link.target(actividad.element);
            link.addTo(this.graph);
          }
        });
      }
    });
  }
}
