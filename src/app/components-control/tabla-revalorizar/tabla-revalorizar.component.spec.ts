import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaRevalorizarComponent } from './tabla-revalorizar.component';

describe('TablaRevalorizarComponent', () => {
  let component: TablaRevalorizarComponent;
  let fixture: ComponentFixture<TablaRevalorizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaRevalorizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaRevalorizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
