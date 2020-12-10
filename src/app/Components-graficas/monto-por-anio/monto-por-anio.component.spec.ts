import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MontoPorAnioComponent } from './monto-por-anio.component';

describe('MontoPorAnioComponent', () => {
  let component: MontoPorAnioComponent;
  let fixture: ComponentFixture<MontoPorAnioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MontoPorAnioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MontoPorAnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
