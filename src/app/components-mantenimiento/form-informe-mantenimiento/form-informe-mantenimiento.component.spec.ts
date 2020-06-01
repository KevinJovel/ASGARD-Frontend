import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInformeMantenimientoComponent } from './form-informe-mantenimiento.component';

describe('FormInformeMantenimientoComponent', () => {
  let component: FormInformeMantenimientoComponent;
  let fixture: ComponentFixture<FormInformeMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormInformeMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormInformeMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
