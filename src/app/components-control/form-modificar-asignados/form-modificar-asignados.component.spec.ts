import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModificarAsignadosComponent } from './form-modificar-asignados.component';

describe('FormModificarAsignadosComponent', () => {
  let component: FormModificarAsignadosComponent;
  let fixture: ComponentFixture<FormModificarAsignadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormModificarAsignadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModificarAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
