import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { CardPoolComponent } from '../card-pool/card-pool.component';
import { SequenceData } from '../data-models/sequence-model';
import { FlashcardData } from '../data-models/flashcard-model';
import { SequenceSidebarComponent } from '../sequence-sidebar/sequence-sidebar.component';
import { Subject } from 'rxjs';
import { StudySetData } from '../data-models/studyset-model';
import { StudySetService } from '../services/study-set.service';
import { getStudySetFromUrl } from '../utilities/route-helper';
import { ActivatedRoute } from '@angular/router';

export interface CardMap {
  key: number,
  card: FlashcardData
}

@Component({
  selector: 'app-study-sequence',
  standalone: true,
  imports: [
    CommonModule,
    SequenceCardComponent,
    FlashcardComponent,
    ReturnRibbonComponent,
    CardPoolComponent,
    SequenceSidebarComponent,
    MatButtonModule,
    MatMenuModule,
    MatMenuTrigger,
    MatIconModule
  ],
  templateUrl: './study-sequence.component.html',
  styleUrl: './study-sequence.component.scss'
})
export class StudySequenceComponent {
  studySet?: StudySetData;
  sequences?: SequenceData[];
  selectedSeq: SequenceData = new SequenceData();
  userSeq: CardMap[] = [];
  cardPool: CardMap[] = [];
  visUpdates: Subject<CardMap> = new Subject<CardMap>();

  constructor(
    private studySetService: StudySetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loadStudySet();
  }

  loadStudySet() {
    getStudySetFromUrl(this.route, this.studySetService)
      .subscribe(sSet => [
        this.studySet = sSet,
        this.sequences = sSet.sequences,
        this.selectedSeq = this.sequences[0],
        this.generateCardPool()
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

  changeSelectedSequence(sequence: SequenceData){
    this.selectedSeq = sequence;
    this.generateCardPool();
  }

  showAnswer(){
    console.log(this.cardPool);
    this.selectedSeq.cardList.forEach((flashcard, index) => {
      var poolIndex = this.cardPool.findIndex(c => c.key === index);
      this.addToSeq(this.cardPool[poolIndex]);
    });
    console.log(this.userSeq);
  }

  clearSequence(){
    console.log(this.userSeq)
    this.userSeq.forEach((card) => {
      this.visUpdates.next(card);
      const index = this.userSeq.indexOf(card);
      this.userSeq.splice(index, 1);
    });
  }

  checkAnswer(){
    if (this.userSeq.length != this.selectedSeq.cardList.length){
      console.log("Incorrect");
      return;
    }
    for(let i = 0; i < this.userSeq.length; i++){
      if (this.userSeq[i].card != this.selectedSeq.cardList[i]){
        console.log("Incorrect");
        return;
      }
    }
    console.log("Everything should be correct!");

  }
}
