import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialSolicitudDescargoComponent } from './historial-solicitud-descargo.component';

describe('HistorialSolicitudDescargoComponent', () => {
  let component: HistorialSolicitudDescargoComponent;
  let fixture: ComponentFixture<HistorialSolicitudDescargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialSolicitudDescargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialSolicitudDescargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
