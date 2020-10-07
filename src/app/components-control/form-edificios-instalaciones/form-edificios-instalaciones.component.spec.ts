import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEdificiosInstalacionesComponent } from './form-edificios-instalaciones.component';

describe('FormEdificiosInstalacionesComponent', () => {
  let component: FormEdificiosInstalacionesComponent;
  let fixture: ComponentFixture<FormEdificiosInstalacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEdificiosInstalacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEdificiosInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
