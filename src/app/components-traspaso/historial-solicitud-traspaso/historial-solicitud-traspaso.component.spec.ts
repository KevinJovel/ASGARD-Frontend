import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialSolicitudTraspasoComponent } from './historial-solicitud-traspaso.component';

describe('HistorialSolicitudTraspasoComponent', () => {
  let component: HistorialSolicitudTraspasoComponent;
  let fixture: ComponentFixture<HistorialSolicitudTraspasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialSolicitudTraspasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialSolicitudTraspasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
