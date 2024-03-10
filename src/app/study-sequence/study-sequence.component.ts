import { Component } from '@angular/core';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { FlashcardComponent } from '../flashcard/flashcard.component';

@Component({
  selector: 'app-study-sequence',
  standalone: true,
  imports: [SequenceCardComponent, FlashcardComponent],
  templateUrl: './study-sequence.component.html',
  styleUrl: './study-sequence.component.scss'
})
export class StudySequenceComponent {

}
