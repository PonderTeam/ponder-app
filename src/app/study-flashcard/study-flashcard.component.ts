import { Component, HostListener } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';
import { StudySetService } from '../services/study-set/study-set.service';
import { FlashcardData } from '../data-models/flashcard-model';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { getStudySetFromUrl } from '../utilities/route-helper';
import { ActivatedRoute } from '@angular/router';
import { calculateScaleFactor } from '../utilities/calculate-scaler';
import { UserInfoService } from '../services/user/user-info.service';
import { StudySetData } from '../data-models/studyset-model';
import { studyFlashcardHeightSF, studyFlashcardWidthSF } from '../utilities/constants';
@Component({
  selector: 'app-study-flashcard',
  standalone: true,
  imports: [
    FlashcardComponent,
    ReturnRibbonComponent,
    CommonModule,
    MatIcon
  ],
  templateUrl: './study-flashcard.component.html',
  styleUrl: './study-flashcard.component.scss'
})
export class StudyFlashcardComponent {
  /** Constant used for calculating flashcard scale */
  cardScaleFactor: number = calculateScaleFactor(studyFlashcardWidthSF, studyFlashcardHeightSF);
  flashcards: FlashcardData[] = [];
  currentFlashcard: FlashcardData = new FlashcardData();
  currentCardIndex: number = 0;
  setId?: string;
  studySet!: StudySetData;

  constructor(
    private studySetService: StudySetService,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
  ) { }

  ngOnInit() {
    this.loadFlashcards();
    this.userInfoService.updateViewDate(this.studySet)
  }

  loadFlashcards() {
    getStudySetFromUrl(this.route, this.studySetService)
      .subscribe(sSet => [
        this.flashcards = sSet.flashcards,
        this.setId = sSet.id,
        this.currentFlashcard = this.flashcards[this.currentCardIndex],
        this.studySet = sSet
      ]);
  }

  previousFlashcard() {
    if (this.hasPreviousCard()) {
      this.currentCardIndex--;
      this.currentFlashcard = this.flashcards[this.currentCardIndex];
    }
  }

  nextFlashcard() {
    if (this.hasNextCard()) {
      this.currentCardIndex++;
      this.currentFlashcard = this.flashcards[this.currentCardIndex];
    }
  }

  hasPreviousCard(): boolean {
    return this.currentCardIndex > 0;
  }

  hasNextCard(): boolean {
    return this.currentCardIndex < (this.flashcards.length - 1);
  }

  calculateProgress(): number {
    const totalCards = this.flashcards.length;
    if (totalCards === 0) {
      return 0; // Prevent division by zero
    }
    return ((this.currentCardIndex + 1) / totalCards) * 100; // Calculate progress as a percentage
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.cardScaleFactor = calculateScaleFactor(studyFlashcardWidthSF, studyFlashcardHeightSF);
  }
}
