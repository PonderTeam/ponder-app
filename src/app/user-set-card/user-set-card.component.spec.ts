import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSetCardComponent } from './user-set-card.component';

describe('UserSetCardComponent', () => {
  let component: UserSetCardComponent;
  let fixture: ComponentFixture<UserSetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSetCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
