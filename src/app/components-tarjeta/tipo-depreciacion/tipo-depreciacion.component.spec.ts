import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDepreciacionComponent } from './tipo-depreciacion.component';

describe('TipoDepreciacionComponent', () => {
  let component: TipoDepreciacionComponent;
  let fixture: ComponentFixture<TipoDepreciacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDepreciacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDepreciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
