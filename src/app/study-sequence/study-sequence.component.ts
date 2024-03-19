import { Component } from '@angular/core';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';
import { CardPoolComponent } from '../card-pool/card-pool.component';
import { SequenceData } from '../data-models/sequence-model';
import { FlashcardData } from '../data-models/flashcard-model';

@Component({
  selector: 'app-study-sequence',
  standalone: true,
  imports: [SequenceCardComponent, FlashcardComponent, ReturnRibbonComponent, CardPoolComponent],
  templateUrl: './study-sequence.component.html',
  styleUrl: './study-sequence.component.scss'
})
export class StudySequenceComponent {
  selectedSeq?: SequenceData;
  cardInSeq: FlashcardData[] = [];
  cardPool: FlashcardData[] = [];

  addToSeq(flashcard: FlashcardData, index?: number) {
    if (index) {
      this.cardInSeq.splice(index, 0, flashcard);
    } else {
      this.cardInSeq.push(flashcard);
    }
  }

  // needs index to handle duplicate card in user sequence
  removeFromSequence(index: number) {
    this.cardInSeq.splice(index, 1);
  }
}
