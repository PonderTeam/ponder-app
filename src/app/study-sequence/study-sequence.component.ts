import { Component } from '@angular/core';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';

@Component({
  selector: 'app-study-sequence',
  standalone: true,
  imports: [SequenceCardComponent, FlashcardComponent, ReturnRibbonComponent],
  templateUrl: './study-sequence.component.html',
  styleUrl: './study-sequence.component.scss'
})
export class StudySequenceComponent {

}
