import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotitieModalComponent } from './notitie-modal.component';

describe('NotitieModalComponent', () => {
  let component: NotitieModalComponent;
  let fixture: ComponentFixture<NotitieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotitieModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotitieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
