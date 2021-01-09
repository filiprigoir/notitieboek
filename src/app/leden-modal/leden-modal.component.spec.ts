import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LedenModalComponent } from './leden-modal.component';

describe('LedenModalComponent', () => {
  let component: LedenModalComponent;
  let fixture: ComponentFixture<LedenModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LedenModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LedenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
