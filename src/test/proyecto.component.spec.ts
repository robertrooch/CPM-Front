import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActividadService } from 'src/app/actividad.service';
import { ProyectoComponent } from 'src/app/proyecto/proyecto.component';

class MockActividadService {
  crearProyecto = jasmine.createSpy('crearProyecto').and.returnValue(of({ id: 1 }));
}

describe('ProyectoComponent', () => {
  let component: ProyectoComponent;
  let fixture: ComponentFixture<ProyectoComponent>;
  let service: MockActividadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ ProyectoComponent ],
      providers: [
        { provide: ActividadService, useClass: MockActividadService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectoComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ActividadService) as any;

    // Datos iniciales
    component.proyecto = { nombre: 'P1', descripcion: 'Desc1' };
    fixture.detectChanges();
  });

  it('TC-06: debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('TC-07: guardarProyecto() éxito – llama al servicio, muestra mensaje de éxito y resetea formulario', fakeAsync(() => {
    component.guardarProyecto();
    tick();
    expect(service.crearProyecto).toHaveBeenCalledWith({ nombre: 'P1', descripcion: 'Desc1' });
    expect(component.successMessage).toBe('Proyecto guardado exitosamente!');
    expect(component.errorMessage).toBe('');
    expect(component.proyecto).toEqual({ nombre: '', descripcion: '' });
  }));

  it('TC-08: guardarProyecto() fallo – muestra mensaje de error y no altera successMessage', fakeAsync(() => {
    (service.crearProyecto as jasmine.Spy).and.returnValue(
      throwError({ message: 'error de red' })
    );

    component.guardarProyecto();
    tick();

    expect(service.crearProyecto).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Hubo un error al guardar el proyecto: error de red');
    expect(component.successMessage).toBe('');
    expect(component.proyecto).toEqual({ nombre: 'P1', descripcion: 'Desc1' });
  }));
});

