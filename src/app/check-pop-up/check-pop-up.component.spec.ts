import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPopUpComponent } from './check-pop-up.component';

describe('CheckPopUpComponent', () => {
  let component: CheckPopUpComponent;
  let fixture: ComponentFixture<CheckPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckPopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
