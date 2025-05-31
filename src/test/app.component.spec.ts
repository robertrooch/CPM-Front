import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from '../app/app.component';
import { ActividadComponent } from '../app/actividad/actividad.component';
import { DiagramaComponent }  from '../app/diagrama/diagrama.component';
import { ProyectoComponent }  from '../app/proyecto/proyecto.component';
import { ProyectosGuardadosComponent } from '../app/guardados.component/guardados.component.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        ActividadComponent,
        DiagramaComponent,
        ProyectoComponent,
        ProyectosGuardadosComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // evita declarar todos los hijos si no es necesario
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('TC-11: debe crear el AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('TC-11: por defecto vistaActual está vacía y mostrarMenu es false', () => {
    expect(component.vistaActual).toBe('');
    expect(component.mostrarMenu).toBeFalsy();
  });

  it('TC-11: mostrarVista(vista) debe asignar vistaActual y ocultar el menú', () => {
    component.mostrarMenu = true;
    component.mostrarVista('actividades');

    expect(component.vistaActual).toBe('actividades');
    expect(component.mostrarMenu).toBeFalsy();
  });
});
