import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyFlashcardComponent } from './study-flashcard.component';

describe('StudyFlashcardComponent', () => {
  let component: StudyFlashcardComponent;
  let fixture: ComponentFixture<StudyFlashcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyFlashcardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudyFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
