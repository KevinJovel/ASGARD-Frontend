import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesDescargoComponent } from './reportes-descargo.component';

describe('ReportesDescargoComponent', () => {
  let component: ReportesDescargoComponent;
  let fixture: ComponentFixture<ReportesDescargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesDescargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesDescargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
