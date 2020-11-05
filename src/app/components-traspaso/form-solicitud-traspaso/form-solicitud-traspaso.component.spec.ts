import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSolicitudTraspasoComponent } from './form-solicitud-traspaso.component';

describe('FormSolicitudTraspasoComponent', () => {
  let component: FormSolicitudTraspasoComponent;
  let fixture: ComponentFixture<FormSolicitudTraspasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSolicitudTraspasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSolicitudTraspasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
