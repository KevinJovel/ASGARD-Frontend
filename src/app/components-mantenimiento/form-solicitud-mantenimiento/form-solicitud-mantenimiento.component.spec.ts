import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolicitudMantenimientoComponent } from './form-solicitud-mantenimiento.component';

describe('FormSolicitudMantenimientoComponent', () => {
  let component: FormSolicitudMantenimientoComponent;
  let fixture: ComponentFixture<FormSolicitudMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSolicitudMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSolicitudMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
