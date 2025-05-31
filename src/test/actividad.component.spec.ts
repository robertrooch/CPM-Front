import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActividadComponent } from 'src/app/actividad/actividad.component';
import { ActividadService } from 'src/app/actividad.service';

class MockActividadService {
  limpiarActividades = jasmine.createSpy('limpiarActividades').and.returnValue(of(null));
  agregarActividad     = jasmine.createSpy('agregarActividad').and.returnValue(of({}));
}

describe('ActividadComponent', () => {
  let component: ActividadComponent;
  let fixture:   ComponentFixture<ActividadComponent>;
  let service:   MockActividadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ ActividadComponent ],
      providers: [
        { provide: ActividadService, useClass: MockActividadService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ActividadService) as any;
    // start with a couple of actividades for eliminar/guardar tests
    component.actividades = [
      { nombre: 'A', tiempoOptimista: 1, tiempoMasProbable: 2, tiempoPesimista: 3, predecesores: '' },
      { nombre: 'B', tiempoOptimista: 1, tiempoMasProbable: 2, tiempoPesimista: 3, predecesores: '' }
    ];
    fixture.detectChanges();
  });

  it('TC-01: debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('TC-04: nuevaActividad() llama a limpiarActividades y añade una actividad vacía', fakeAsync(() => {
    component.actividades = [];
    service.limpiarActividades.calls.reset();
    fixture.detectChanges();

    component.nuevaActividad();
    tick();

    expect(service.limpiarActividades).toHaveBeenCalledTimes(1);
    expect(component.actividades.length).toBe(1);

    const nueva = component.actividades[0];
    expect(nueva).toEqual({
      nombre: '',
      tiempoOptimista: 0,
      tiempoMasProbable: 0,
      tiempoPesimista: 0,
      predecesores: ''
    });
  }));

  it('TC-02: eliminarActividad(index) reduce el array y quita el elemento correcto', () => {
    expect(component.actividades.length).toBe(2);
    // eliminamos la primera
    component.eliminarActividad(0);
    expect(component.actividades.length).toBe(1);
    expect(component.actividades[0].nombre).toBe('B');
  });

  it('TC-03: guardarActividades() debe llamar a limpiarActividades y luego a agregarActividad por cada actividad', fakeAsync(() => {
    service.limpiarActividades.calls.reset();
    service.agregarActividad.calls.reset();

    component.guardarActividades();
    tick();
    expect(service.limpiarActividades).toHaveBeenCalledTimes(1);
    expect(service.agregarActividad).toHaveBeenCalledTimes(2);
    component.actividades.forEach(act =>
      expect(service.agregarActividad).toHaveBeenCalledWith({
        nombre: act.nombre,
        tiempoOptimista: act.tiempoOptimista,
        tiempoMasProbable: act.tiempoMasProbable,
        tiempoPesimista: act.tiempoPesimista,
        predecesores: act.predecesores
      })
    );
  }));
});
