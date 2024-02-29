import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInNavBarComponent } from './sign-in-nav-bar.component';

describe('SignInNavBarComponent', () => {
  let component: SignInNavBarComponent;
  let fixture: ComponentFixture<SignInNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInNavBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignInNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
