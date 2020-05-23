import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNuevoBienComponent } from './form-nuevo-bien.component';

describe('FormNuevoBienComponent', () => {
  let component: FormNuevoBienComponent;
  let fixture: ComponentFixture<FormNuevoBienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNuevoBienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNuevoBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
