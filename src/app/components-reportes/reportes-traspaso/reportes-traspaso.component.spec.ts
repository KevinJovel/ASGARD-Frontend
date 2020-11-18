import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesTraspasoComponent } from './reportes-traspaso.component';

describe('ReportesTraspasoComponent', () => {
  let component: ReportesTraspasoComponent;
  let fixture: ComponentFixture<ReportesTraspasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesTraspasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesTraspasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
