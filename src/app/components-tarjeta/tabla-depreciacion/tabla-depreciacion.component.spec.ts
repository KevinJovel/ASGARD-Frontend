import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaDepreciacionComponent } from './tabla-depreciacion.component';

describe('TablaDepreciacionComponent', () => {
  let component: TablaDepreciacionComponent;
  let fixture: ComponentFixture<TablaDepreciacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaDepreciacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
