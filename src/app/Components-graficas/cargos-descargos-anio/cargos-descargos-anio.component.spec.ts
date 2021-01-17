import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargosDescargosAnioComponent } from './cargos-descargos-anio.component';

describe('CargosDescargosAnioComponent', () => {
  let component: CargosDescargosAnioComponent;
  let fixture: ComponentFixture<CargosDescargosAnioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargosDescargosAnioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargosDescargosAnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
