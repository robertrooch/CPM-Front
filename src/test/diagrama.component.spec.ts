import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DiagramaComponent } from 'src/app/diagrama/diagrama.component';
import { ActividadService } from 'src/app/actividad.service';

class MockActividadService {
  obtenerProyectos = jasmine
    .createSpy('obtenerProyectos')
    .and.returnValue(of([{ id: 10, nombre: 'P10' }]));
  calcularTiempos = jasmine
    .createSpy('calcularTiempos')
    .and.returnValue(of({ actividades: [
      { nombre: 'X', duracion: 1, estart: 0, efinish: 1, lstart: 0, lfinish: 1, htotal: 0, hlibre: 1, predecesores: [], sucesores: [] }
    ] }));
  guardarCPM = jasmine.createSpy('guardarCPM').and.returnValue(of({ ok: true }));
}

describe('DiagramaComponent', () => {
  let component: DiagramaComponent;
  let fixture: ComponentFixture<DiagramaComponent>;
  let service: MockActividadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ DiagramaComponent ],
      providers: [
        { provide: ActividadService, useClass: MockActividadService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagramaComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ActividadService) as any;
  });

  it('TC-09: ngOnInit debe invocar obtenerProyectos y asignar proyectos', fakeAsync(() => {
    expect(component.proyectos).toEqual([]);  
    component.ngOnInit();
    tick();
    expect(service.obtenerProyectos).toHaveBeenCalledTimes(1);
    expect(component.proyectos).toEqual([{ id: 10, nombre: 'P10' }]);
  }));

  it('TC-09: generarDiagrama llama a calcularTiempos y luego renderizarDiagrama', fakeAsync(() => {
    spyOn(component, 'renderizarDiagrama').and.stub();
    expect(component.actividades).toEqual([]);
    component.generarDiagrama();
    tick();
    expect(service.calcularTiempos).toHaveBeenCalledTimes(1);
    expect(component.actividades.length).toBe(1);
    expect(component.actividades[0].nombre).toBe('X');
    expect(component.renderizarDiagrama).toHaveBeenCalled();
  }));

});
