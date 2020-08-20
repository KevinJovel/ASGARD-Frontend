import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCooperativaComponent } from './form-cooperativa.component';

describe('FormCooperativaComponent', () => {
  let component: FormCooperativaComponent;
  let fixture: ComponentFixture<FormCooperativaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCooperativaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCooperativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
