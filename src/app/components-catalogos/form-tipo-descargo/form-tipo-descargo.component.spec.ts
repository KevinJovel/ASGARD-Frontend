import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTipoDescargoComponent } from './form-tipo-descargo.component';

describe('FormTipoDescargoComponent', () => {
  let component: FormTipoDescargoComponent;
  let fixture: ComponentFixture<FormTipoDescargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTipoDescargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTipoDescargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
