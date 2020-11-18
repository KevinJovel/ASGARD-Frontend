import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportesCatalogosComponent } from './reportes-catalogos.component';

describe('ReportesCatalogosComponent', () => {
  let component: ReportesCatalogosComponent;
  let fixture: ComponentFixture<ReportesCatalogosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesCatalogosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportesCatalogosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
