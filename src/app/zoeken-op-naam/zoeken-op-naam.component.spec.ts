import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoekenOpNaamComponent } from './zoeken-op-naam.component';

describe('ZoekenOpNaamComponent', () => {
  let component: ZoekenOpNaamComponent;
  let fixture: ComponentFixture<ZoekenOpNaamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZoekenOpNaamComponent ]
    })
    .compileComponents();
  });
   
  beforeEach(() => {
    fixture = TestBed.createComponent(ZoekenOpNaamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
