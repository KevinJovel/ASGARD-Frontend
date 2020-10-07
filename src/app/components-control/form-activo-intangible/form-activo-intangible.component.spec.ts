import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActivoIntangibleComponent } from './form-activo-intangible.component';

describe('FormActivoIntangibleComponent', () => {
  let component: FormActivoIntangibleComponent;
  let fixture: ComponentFixture<FormActivoIntangibleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormActivoIntangibleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormActivoIntangibleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
