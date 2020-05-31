import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAsignancionComponent } from './form-asignancion.component';

describe('FormAsignancionComponent', () => {
  let component: FormAsignancionComponent;
  let fixture: ComponentFixture<FormAsignancionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAsignancionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAsignancionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
