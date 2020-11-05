import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSolicitudDescargoComponent } from './tabla-solicitud-descargo.component';

describe('TablaSolicitudDescargoComponent', () => {
  let component: TablaSolicitudDescargoComponent;
  let fixture: ComponentFixture<TablaSolicitudDescargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaSolicitudDescargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSolicitudDescargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
