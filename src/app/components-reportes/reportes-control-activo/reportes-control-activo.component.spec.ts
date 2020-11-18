import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesControlActivoComponent } from './reportes-control-activo.component';

describe('ReportesControlActivoComponent', () => {
  let component: ReportesControlActivoComponent;
  let fixture: ComponentFixture<ReportesControlActivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesControlActivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesControlActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
