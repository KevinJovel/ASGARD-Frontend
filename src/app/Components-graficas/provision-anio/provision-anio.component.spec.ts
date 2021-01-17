import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvisionAnioComponent } from './provision-anio.component';

describe('ProvisionAnioComponent', () => {
  let component: ProvisionAnioComponent;
  let fixture: ComponentFixture<ProvisionAnioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvisionAnioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionAnioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
