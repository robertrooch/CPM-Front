import { Component } from '@angular/core';
import { ActividadService } from '../actividad.service';
import * as joint from 'jointjs';

@Component({
  selector: 'app-diagrama',
  templateUrl: './diagrama.component.html'
})
export class DiagramaComponent {
  actividades: any[] = [];
  graph: any;

  constructor(private actividadService: ActividadService) {}

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

  renderizarDiagrama() {
    // Crear un nuevo gráfico de JointJS
    this.graph = new joint.dia.Graph();
  
    // Crear el área de dibujo del diagrama
    const paper = new joint.dia.Paper({
      el: document.getElementById('diagrama'),
      model: this.graph,
      width: 1000,
      height: 600,
      gridSize: 10
    });
  
    const elementos: any[] = [];
  
    // Crear nodo de Inicio
    const inicio = new joint.shapes.standard.Rectangle();
    inicio.position(10, 250); // Posicionar el nodo de Inicio
    inicio.resize(100, 50);
    inicio.attr({
      body: { fill: 'white' },
      label: { text: '0|0|0\nInicio\n0| |0', fill: 'black' }
    });
    inicio.addTo(this.graph);
  
    // Crear nodos para cada actividad
    this.actividades.forEach((actividad, index) => {
      const rect = new joint.shapes.standard.Rectangle();
      rect.position(150 + (index % 5) * 150, 50 + Math.floor(index / 5) * 100);
      rect.resize(100, 50);
      rect.attr({
        body: { fill: actividad.htotal === 0 ? '#9bd9fa' : 'white' },
        label: {
          text: `${actividad.estart}|${actividad.duracion}|${actividad.efinish}\n${actividad.nombre}\n${actividad.lstart}|${actividad.htotal}/${actividad.hlibre}|${actividad.lfinish}`,
          fill: 'black'
        }
      });
      rect.addTo(this.graph);
  
      // Guardar el elemento para conectar sus predecesores después
      actividad.element = rect;
      elementos.push(rect);
    });
  
    // Conectar nodo Inicio con actividades que no tengan predecesores
    this.actividades.forEach((actividad) => {
      if (!actividad.predecesores || actividad.predecesores.length === 0 || (Array.isArray(actividad.predecesores) && actividad.predecesores[0] === "")) {
        const link = new joint.shapes.standard.Link();
        link.source(inicio);
        link.target(actividad.element);
        link.addTo(this.graph);
      }
    });
  
    // Crear nodo de Fin
    const fin = new joint.shapes.standard.Rectangle();
    fin.position(850, 250); // Posicionar el nodo de Fin
    fin.resize(100, 50);
    fin.attr({
      body: { fill: 'white' },
      label: { text: `${this.actividades.reduce((max, act) => Math.max(max, act.efinish), 0)}|0|${this.actividades.reduce((max, act) => Math.max(max, act.efinish), 0)}\nFin\n| |`, fill: 'black' }
    });
    fin.addTo(this.graph);
  
    // Conectar actividades que no tengan sucesores con el nodo Fin
    this.actividades.forEach((actividad) => {
      if (!actividad.sucesores || actividad.sucesores.length === 0) {
        const link = new joint.shapes.standard.Link();
        link.source(actividad.element);
        link.target(fin);
        link.addTo(this.graph);
      }
    });
  
    // Agregar enlaces entre predecesores y sucesores
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
