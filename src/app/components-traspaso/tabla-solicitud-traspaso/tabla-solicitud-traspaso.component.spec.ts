import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSolicitudTraspasoComponent } from './tabla-solicitud-traspaso.component';

describe('TablaSolicitudTraspasoComponent', () => {
  let component: TablaSolicitudTraspasoComponent;
  let fixture: ComponentFixture<TablaSolicitudTraspasoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaSolicitudTraspasoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSolicitudTraspasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
