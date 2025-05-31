import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActividadService } from 'src/app/actividad.service';


describe('ActividadService', () => {
  let service: ActividadService;
  let httpMock: HttpTestingController;
  const API = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ActividadService ]
    });
    service = TestBed.get(ActividadService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // asegura que no queden peticiones pendientes
  });

  it('TC-04: limpiarActividades() hace POST a /limpiar-actividades', () => {
    service.limpiarActividades().subscribe();
    const req = httpMock.expectOne(`${API}/limpiar-actividades`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush({}); 
  });

  it('TC-05: agregarActividad() hace POST a /nueva-actividad con el payload', () => {
    const payload = { nombre: 'X' };
    service.agregarActividad(payload).subscribe(resp => {
      expect(resp).toEqual({ ok: true });
    });
    const req = httpMock.expectOne(`${API}/nueva-actividad`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush({ ok: true });
  });
});
