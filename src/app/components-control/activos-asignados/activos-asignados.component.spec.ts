import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivosAsignadosComponent } from './activos-asignados.component';

describe('ActivosAsignadosComponent', () => {
  let component: ActivosAsignadosComponent;
  let fixture: ComponentFixture<ActivosAsignadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivosAsignadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivosAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
