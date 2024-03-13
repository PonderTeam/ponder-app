import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetPreviewCardComponent } from './set-preview-card.component';

describe('SetPreviewCardComponent', () => {
  let component: SetPreviewCardComponent;
  let fixture: ComponentFixture<SetPreviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetPreviewCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
