import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCompanyComponent } from './display-company.component';

describe('DisplayCompanyComponent', () => {
  let component: DisplayCompanyComponent;
  let fixture: ComponentFixture<DisplayCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
