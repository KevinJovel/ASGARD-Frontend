import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuGraficasComponent } from './menu-graficas.component';

describe('MenuGraficasComponent', () => {
  let component: MenuGraficasComponent;
  let fixture: ComponentFixture<MenuGraficasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuGraficasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuGraficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
