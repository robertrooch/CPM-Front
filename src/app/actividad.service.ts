import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  agregarActividad(actividad: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/nueva-actividad`, actividad);
  }

  calcularTiempos(): Observable<any> {
    return this.http.post(`${this.apiUrl}/calcular-tiempos`, {});
  }

  limpiarActividades(): Observable<any> {
    return this.http.post(`${this.apiUrl}/limpiar-actividades`, {});
  }

  obtenerActividadesGuardadas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/actividades-cpm`);
  }

  guardarCPM(proyectoId: number, actividades: any[]): Observable<any> {
    return this.http.post('http://localhost:3000/guardar-cpm', { proyectoId, actividades });
  }
  
  obtenerProyectos(): Observable<any> {
    return this.http.get(`${this.apiUrl}/proyectos`);
  }

  obtenerActividadesPorProyecto(proyectoId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/actividades-cpm/${proyectoId}`);
  }

  crearProyecto(proyecto: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/proyectos`, proyecto);
  }
  
}