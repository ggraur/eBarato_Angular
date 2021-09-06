import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentialForSaleComponent } from './residential-for-sale.component';

describe('ResidentialForSaleComponent', () => {
  let component: ResidentialForSaleComponent;
  let fixture: ComponentFixture<ResidentialForSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentialForSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidentialForSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
