import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurecompanyComponent } from './configurecompany.component';

describe('ConfigurecompanyComponent', () => {
  let component: ConfigurecompanyComponent;
  let fixture: ComponentFixture<ConfigurecompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurecompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigurecompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
