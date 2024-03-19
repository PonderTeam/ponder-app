import { Component } from '@angular/core';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';
import { CardPoolComponent } from '../card-pool/card-pool.component';
import { SequenceData } from '../data-models/sequence-model';
import { FlashcardData } from '../data-models/flashcard-model';
import { SequenceSidebarComponent } from '../sequence-sidebar/sequence-sidebar.component';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-study-sequence',
  standalone: true,
  imports: [
    SequenceCardComponent,
    FlashcardComponent,
    ReturnRibbonComponent,
    CardPoolComponent,
    SequenceSidebarComponent
  ],
  templateUrl: './study-sequence.component.html',
  styleUrl: './study-sequence.component.scss'
})
export class StudySequenceComponent {
  selectedSeq?: SequenceData;
  userSeq: FlashcardData[] = [];
  cardPool: FlashcardData[] = [];
  visUpdates: Subject<string> = new Subject<string>;

  addToSeq(flashcard: FlashcardData, index?: number) {
    if (index) {
      this.userSeq.splice(index, 0, flashcard);
    } else {
      this.userSeq.push(flashcard);
    }
  }

  // index is used to handle dupili
  removeFromSequence(index: number) {
    this.visUpdates.next(this.userSeq[index].term)
    this.userSeq.splice(index, 1);
  }
}
