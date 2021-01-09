import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotitieLijstComponent } from './notitie-lijst.component';

describe('NotitieLijstComponent', () => {
  let component: NotitieLijstComponent;
  let fixture: ComponentFixture<NotitieLijstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotitieLijstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotitieLijstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
