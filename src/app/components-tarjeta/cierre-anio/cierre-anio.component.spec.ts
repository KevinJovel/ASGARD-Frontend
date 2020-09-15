import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CierreAnioComponent } from './cierre-anio.component';

describe('CierreAnioComponent', () => {
  let component: CierreAnioComponent;
  let fixture: ComponentFixture<CierreAnioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CierreAnioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CierreAnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
