import { Component } from '@angular/core';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';
import { CardPoolComponent } from '../card-pool/card-pool.component';
import { SequenceData } from '../data-models/sequence-model';
import { FlashcardData } from '../data-models/flashcard-model';
import { SequenceSidebarComponent } from '../sequence-sidebar/sequence-sidebar.component';
import { Subject } from 'rxjs';
import { StudySetData } from '../data-models/studyset-model';
import { StudySetService } from '../services/study-set.service';

export interface CardMap {
  key: number,
  card: FlashcardData
}

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
  studySet?: StudySetData;
  selectedSeq: SequenceData = new SequenceData();
  userSeq: CardMap[] = [];
  cardPool: CardMap[] = [];
  visUpdates: Subject<CardMap> = new Subject<CardMap>();

  constructor(private studySetService: StudySetService) {}

  ngOnInit() {
    this.studySetService.getStudySet('aaaa')
      .subscribe(sSet => [
        this.studySet = sSet,
        this.selectedSeq = this.studySet!.sequences[0],
        console.log(this.studySet),
        this.generateCardPool(),
      ]);
  }

  addToSeq(item: CardMap) {
    this.userSeq.push(item);
  }

  // index is used to handle
  removeFromSequence(item: CardMap) {
    this.visUpdates.next(item);
    const index = this.userSeq.indexOf(item);
    this.userSeq.splice(index, 1);
  }

  generateCardPool() {
    const seqLen = this.selectedSeq.cardList.length;
    const pool = Array<CardMap>(seqLen);

    // copy sequence cards into pool
    this.selectedSeq.cardList.forEach((flashcard, index) => {
      pool[index] = {key: index, card: flashcard};
    })

    // get cards not in th sequence
    const otherCards = this.studySet!.getCardsNotInSeq(this.selectedSeq);
    if (otherCards.length > 3) { this.shuffle(otherCards)};

    // add up to 3 distraction cards
    while(pool.length <= seqLen + 3 && otherCards.length > 0) {
      pool.push({key: pool.length+1, card: otherCards.pop()!});
    }

    this.shuffle(pool);
    this.cardPool = pool;
  }

  // shuffle order using Fisher-Yates
  shuffle(array: any[]) {
    for (let i = array.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
