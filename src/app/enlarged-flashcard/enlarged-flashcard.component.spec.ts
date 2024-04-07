import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlargedFlashcardComponent } from './enlarged-flashcard.component';

describe('EnlargedFlashcardComponent', () => {
  let component: EnlargedFlashcardComponent;
  let fixture: ComponentFixture<EnlargedFlashcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnlargedFlashcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnlargedFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
