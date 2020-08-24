import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTarjetaComponent } from './report-tarjeta.component';

describe('ReportTarjetaComponent', () => {
  let component: ReportTarjetaComponent;
  let fixture: ComponentFixture<ReportTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportTarjetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
