import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSolicitudComponent } from './tabla-solicitud.component';

describe('TablaSolicitudComponent', () => {
  let component: TablaSolicitudComponent;
  let fixture: ComponentFixture<TablaSolicitudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaSolicitudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
