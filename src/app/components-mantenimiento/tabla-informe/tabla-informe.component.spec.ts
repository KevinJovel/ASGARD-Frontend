import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInformeComponent } from './tabla-informe.component';

describe('TablaInformeComponent', () => {
  let component: TablaInformeComponent;
  let fixture: ComponentFixture<TablaInformeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaInformeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
