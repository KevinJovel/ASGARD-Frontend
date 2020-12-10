import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivosPorAnioComponent } from './activos-por-anio.component';

describe('ActivosPorAnioComponent', () => {
  let component: ActivosPorAnioComponent;
  let fixture: ComponentFixture<ActivosPorAnioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivosPorAnioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivosPorAnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
