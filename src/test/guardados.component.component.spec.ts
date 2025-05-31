import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

import { ProyectosGuardadosComponent } from '../app/guardados.component/guardados.component.component';
import { ActividadService } from '../app/actividad.service';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

class MockActividadService {
  obtenerProyectos = jasmine.createSpy('obtenerProyectos').and.returnValue(of([]));
  obtenerActividadesPorProyecto = jasmine.createSpy('obtenerActividadesPorProyecto').and.returnValue(of([]));
}

describe('ProyectosGuardadosComponent', () => {
  let component: ProyectosGuardadosComponent;
  let fixture: ComponentFixture<ProyectosGuardadosComponent>;
  let service: MockActividadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ ProyectosGuardadosComponent ],
      providers: [
        { provide: ActividadService, useClass: MockActividadService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosGuardadosComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ActividadService) as any;
  });

  it('TC-10: debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('TC-10: ngOnInit llama a obtenerProyectosGuardados y asigna proyectosGuardados vacíos', fakeAsync(() => {
    // servicio devuelve []
    component.ngOnInit();
    tick();
    expect(service.obtenerProyectos).toHaveBeenCalledTimes(1);
    expect(component.proyectosGuardados).toEqual([]);
    expect(component.errorMessage).toBe('');
  }));

  it('TC-10: obtenerProyectosGuardados en error asigna errorMessage', fakeAsync(() => {
    // simulamos error
    (service.obtenerProyectos as jasmine.Spy).and.returnValue(
      throwError({ message: 'fallo red' })
    );
    component.obtenerProyectosGuardados();
    tick();
    expect(component.proyectosGuardados).toEqual([]);
    expect(component.errorMessage)
      .toBe('Hubo un error al obtener los proyectos guardados: fallo red');
  }));

  it('TC-10/TC-11: onProyectoSeleccionado carga actividades y setea proyectoSeleccionado', fakeAsync(() => {
    const proyectosMock = [{ id: 5, nombre: 'P5' }, { id: 7, nombre: 'P7' }];
    const actividadesMock = [{ nombre: 'Act1' }, { nombre: 'Act2' }];
    (service.obtenerProyectos as jasmine.Spy).and.returnValue(of(proyectosMock));
    (service.obtenerActividadesPorProyecto as jasmine.Spy).and.returnValue(of(actividadesMock));

    component.ngOnInit();
    tick();
    expect(component.proyectosGuardados).toEqual(proyectosMock);
    component.onProyectoSeleccionado(7);
    tick();

    expect(component.proyectoSeleccionado).toEqual({ id: 7, nombre: 'P7' });
    expect(service.obtenerActividadesPorProyecto).toHaveBeenCalledWith(7);
    expect(component.actividadesGuardadas).toEqual(actividadesMock);
    expect(component.errorMessage).toBe('');
  }));

  it('TC-10: obtenerActividadesPorProyecto en error asigna errorMessage', fakeAsync(() => {
    (service.obtenerActividadesPorProyecto as jasmine.Spy).and.returnValue(
      throwError({ message: 'error actividades' })
    );
    component.obtenerActividadesPorProyecto(3);
    tick();
    expect(component.actividadesGuardadas).toEqual([]);
    expect(component.errorMessage)
      .toBe('Hubo un error al obtener las actividades del proyecto: error actividades');
  }));
});
