import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTipoActivoComponent } from './select-tipo-activo.component';

describe('SelectTipoActivoComponent', () => {
  let component: SelectTipoActivoComponent;
  let fixture: ComponentFixture<SelectTipoActivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTipoActivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTipoActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
