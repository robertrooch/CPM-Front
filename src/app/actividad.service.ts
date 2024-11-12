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
}
