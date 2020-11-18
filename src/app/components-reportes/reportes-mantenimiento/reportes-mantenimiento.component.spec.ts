import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesMantenimientoComponent } from './reportes-mantenimiento.component';

describe('ReportesMantenimientoComponent', () => {
  let component: ReportesMantenimientoComponent;
  let fixture: ComponentFixture<ReportesMantenimientoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesMantenimientoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
