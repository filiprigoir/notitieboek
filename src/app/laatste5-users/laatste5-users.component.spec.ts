import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Laatste5UsersComponent } from './laatste5-users.component';

describe('Laatste5UsersComponent', () => {
  let component: Laatste5UsersComponent;
  let fixture: ComponentFixture<Laatste5UsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Laatste5UsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Laatste5UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
