import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuadroSolicitudComponent } from './cuadro-solicitud.component';

describe('CuadroSolicitudComponent', () => {
  let component: CuadroSolicitudComponent;
  let fixture: ComponentFixture<CuadroSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuadroSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuadroSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
