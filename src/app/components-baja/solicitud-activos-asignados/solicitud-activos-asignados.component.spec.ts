import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudActivosAsignadosComponent } from './solicitud-activos-asignados.component';

describe('SolicitudActivosAsignadosComponent', () => {
  let component: SolicitudActivosAsignadosComponent;
  let fixture: ComponentFixture<SolicitudActivosAsignadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudActivosAsignadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudActivosAsignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
