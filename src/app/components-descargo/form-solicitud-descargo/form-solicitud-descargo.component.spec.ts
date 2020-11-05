import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolicitudDescargoComponent } from './form-solicitud-descargo.component';

describe('FormSolicitudDescargoComponent', () => {
  let component: FormSolicitudDescargoComponent;
  let fixture: ComponentFixture<FormSolicitudDescargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSolicitudDescargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSolicitudDescargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
