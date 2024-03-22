import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharePopUpComponent } from './share-pop-up.component';

describe('SharePopUpComponent', () => {
  let component: SharePopUpComponent;
  let fixture: ComponentFixture<SharePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharePopUpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SharePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
