import { Component, HostListener } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';
import { StudySetService } from '../services/study-set.service';
import { FlashcardData } from '../data-models/flashcard-model';

@Component({
  selector: 'app-study-flashcard',
  standalone: true,
  imports: [FlashcardComponent, ReturnRibbonComponent],
  templateUrl: './study-flashcard.component.html',
  styleUrl: './study-flashcard.component.scss'
})
export class StudyFlashcardComponent {
  constructor(private studySetService: StudySetService) { }

  cardScaleFactor: number = window.innerWidth * (880 / 1280) / 500;
  //property named 'flashcards':
  flashcards: FlashcardData[] = []; 
  /*
  'flashcards' property is an array that holds objects of type FlashcardData.
  The part after the equal sign is an empty array. 
  We are assigning the array of type FlashCard Data to an empty array.
  */

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.cardScaleFactor = window.innerWidth * (880 / 1280) / 500;
  }
}
