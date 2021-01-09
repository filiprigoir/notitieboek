import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotitieBeherenComponent } from './notitie-beheren.component';

describe('NotitieBeherenComponent', () => {
  let component: NotitieBeherenComponent;
  let fixture: ComponentFixture<NotitieBeherenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotitieBeherenComponent ]
    })
    .compileComponents();
  });
 
  beforeEach(() => {
    fixture = TestBed.createComponent(NotitieBeherenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
