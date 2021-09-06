import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAddsComponent } from './display-adds.component';

describe('DisplayAddsComponent', () => {
  let component: DisplayAddsComponent;
  let fixture: ComponentFixture<DisplayAddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAddsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
