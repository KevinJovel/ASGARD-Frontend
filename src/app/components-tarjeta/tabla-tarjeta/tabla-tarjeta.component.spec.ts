import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaTarjetaComponent } from './tabla-tarjeta.component';

describe('TablaTarjetaComponent', () => {
  let component: TablaTarjetaComponent;
  let fixture: ComponentFixture<TablaTarjetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaTarjetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
