import { Component } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';

@Component({
  selector: 'app-study-flashcard',
  standalone: true,
  imports: [FlashcardComponent],
  templateUrl: './study-flashcard.component.html',
  styleUrl: './study-flashcard.component.scss'
})
export class StudyFlashcardComponent {

}
