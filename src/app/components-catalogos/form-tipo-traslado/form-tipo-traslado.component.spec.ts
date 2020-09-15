import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTipoTrasladoComponent } from './form-tipo-traslado.component';

describe('FormTipoTrasladoComponent', () => {
  let component: FormTipoTrasladoComponent;
  let fixture: ComponentFixture<FormTipoTrasladoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTipoTrasladoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTipoTrasladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
