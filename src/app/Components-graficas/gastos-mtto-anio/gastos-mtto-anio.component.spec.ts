import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosMttoAnioComponent } from './gastos-mtto-anio.component';

describe('GastosMttoAnioComponent', () => {
  let component: GastosMttoAnioComponent;
  let fixture: ComponentFixture<GastosMttoAnioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GastosMttoAnioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GastosMttoAnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
