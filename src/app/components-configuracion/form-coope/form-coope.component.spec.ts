import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCoopeComponent } from './form-coope.component';

describe('FormCoopeComponent', () => {
  let component: FormCoopeComponent;
  let fixture: ComponentFixture<FormCoopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCoopeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCoopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
