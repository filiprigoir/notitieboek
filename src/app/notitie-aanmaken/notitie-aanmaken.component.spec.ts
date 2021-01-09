import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotitieAanmakenComponent } from './notitie-aanmaken.component';

describe('NotitieAanmakenComponent', () => {
  let component: NotitieAanmakenComponent;
  let fixture: ComponentFixture<NotitieAanmakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotitieAanmakenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotitieAanmakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
