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
import { StudySetData } from '../data-models/studyset-model';
import { StudySetService } from '../services/study-set/study-set.service';
import { getStudySetFromUrl } from '../utilities/route-helper';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog} from '@angular/material/dialog';
import { CheckPopUpComponent } from '../check-pop-up/check-pop-up.component';
import { UserInfoService } from '../services/user/user-info.service';
import { CdkDropListGroup, transferArrayItem } from '@angular/cdk/drag-drop';

export interface CardMap {
  key: number,
  card: FlashcardData
}

export type DragItem = [CardMap]

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
    MatIconModule,
    CdkDropListGroup
  ],
  templateUrl: './study-sequence.component.html',
  styleUrl: './study-sequence.component.scss'
})
export class StudySequenceComponent {
  studySet?: StudySetData;
  sequences?: SequenceData[];
  selectedSeq: SequenceData = new SequenceData();
  userSeq: CardMap[] = [];
  cardPool: DragItem[] = [];
  basePool: DragItem[] = [];
  showBackArea: boolean = false;

  constructor(
    private studySetService: StudySetService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialog,
    private userInfoService: UserInfoService,
  ) {}

  ngOnInit() {
    this.loadStudySet();
  }

  loadStudySet() {
    getStudySetFromUrl(this.route, this.studySetService)
      .subscribe(sSet => {
        if (!sSet.sequences || sSet.sequences.length === 0) {
          this.router.navigate(["view-set"], { queryParams:{ sid: sSet.id }});
        } else {
          this.studySet = sSet;
          this.sequences = sSet.sequences;
          this.selectedSeq = this.sequences[0];
          this.generateCardPool();
          this.userInfoService.updateViewDate(this.studySet!);
        }
    });
  }

  addToSeq(item: CardMap) {
    transferArrayItem(
      this.cardPool[item.key],
      this.userSeq,
      0,
      this.userSeq.length
    );
  }

  removeFromSequence(item: CardMap) {
    const index = this.userSeq.indexOf(item);
    this._removeFromSequence(item, index);
  }

  private _removeFromSequence(item: CardMap, index: number) {
    transferArrayItem(
      this.userSeq,
      this.cardPool[item.key],
      index,
      0
    );
  }

  generateCardPool() {
    const seqLen = this.selectedSeq.cardList.length;
    const pool: FlashcardData[] = [];

    // copy sequence cards into pool
    this.selectedSeq.cardList.forEach(flashcard => {
      pool.push(flashcard);
    })

    // get cards not in th sequence
    const otherCards = this.studySet!.getCardsNotInSeq(this.selectedSeq);
    if (otherCards.length > 3) { this.shuffle(otherCards)};

    // add up to 3 distraction cards
    while(pool.length <= seqLen + 3 && otherCards.length > 0) {
      pool.push(otherCards.pop()!);
    }

    this.shuffle(pool);
    this.cardPool = pool.map((card, index) => [{key:index, card:card}]);
    this.basePool = this.cardPool.map(x => Object.assign([], x));
  }

  // shuffle order using Fisher-Yates
  shuffle(array: any[]) {
    for (let i = array.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  changeSelectedSequence(sequence: SequenceData) {
    this.selectedSeq = sequence;
    this.clearSequence();
    this.generateCardPool();
  }

  showAnswer() {
    this.clearSequence();
    setTimeout(() => {
      this.selectedSeq.cardList.forEach((flashcard) => {
        var poolIndex = this.basePool.findIndex(c => c[0].card === flashcard);
        this.addToSeq(this.cardPool[poolIndex][0]);
      });
    })
  }

  clearSequence() {
    for(let i = this.userSeq.length - 1; i >= 0; i--) {
      this._removeFromSequence(this.userSeq[i], i);
    }
  }

  checkAnswer() {
    if (this.userSeq.length != this.selectedSeq.cardList.length) {
      this.dialogRef.open(CheckPopUpComponent, {
        data: {answer: 'Incorrect!'}
      });
      return;
    }
    for(let i = 0; i < this.userSeq.length; i++) {
      if (this.userSeq[i].card != this.selectedSeq.cardList[i]) {
        this.dialogRef.open(CheckPopUpComponent, {
          data: {answer: 'Incorrect!'}
        });
        return;
      }
    }
    this.dialogRef.open(CheckPopUpComponent, {
      data: {answer: 'Correct!'}
    });
  }

  toggleBackArea(event: boolean) {
    this.showBackArea = event;
  }
}
