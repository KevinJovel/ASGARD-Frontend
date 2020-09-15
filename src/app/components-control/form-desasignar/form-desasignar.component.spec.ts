import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDesasignarComponent } from './form-desasignar.component';

describe('FormDesasignarComponent', () => {
  let component: FormDesasignarComponent;
  let fixture: ComponentFixture<FormDesasignarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormDesasignarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDesasignarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
