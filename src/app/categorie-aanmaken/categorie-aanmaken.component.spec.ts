import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieAanmakenComponent } from './categorie-aanmaken.component';

describe('CategorieAanmakenComponent', () => {
  let component: CategorieAanmakenComponent;
  let fixture: ComponentFixture<CategorieAanmakenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieAanmakenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieAanmakenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
