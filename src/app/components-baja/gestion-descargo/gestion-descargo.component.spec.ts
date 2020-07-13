import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDescargoComponent } from './gestion-descargo.component';

describe('GestionDescargoComponent', () => {
  let component: GestionDescargoComponent;
  let fixture: ComponentFixture<GestionDescargoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionDescargoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDescargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
