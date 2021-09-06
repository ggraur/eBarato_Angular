import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfAddsComponent } from './list-of-adds.component';

describe('ListOfAddsComponent', () => {
  let component: ListOfAddsComponent;
  let fixture: ComponentFixture<ListOfAddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfAddsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
