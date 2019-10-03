import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleBookComponent } from './vehicle-book.component';

describe('VehicleBookComponent', () => {
  let component: VehicleBookComponent;
  let fixture: ComponentFixture<VehicleBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
