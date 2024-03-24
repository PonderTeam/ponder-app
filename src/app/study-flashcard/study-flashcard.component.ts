import { Component, HostListener, ViewChild } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';
import { StudySetService } from '../services/study-set.service';
import { FlashcardData } from '../data-models/flashcard-model';
import { StudySetData } from '../data-models/studyset-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-study-flashcard',
  standalone: true,
  imports: [FlashcardComponent, ReturnRibbonComponent, CommonModule],
  templateUrl: './study-flashcard.component.html',
  styleUrl: './study-flashcard.component.scss'
})
export class StudyFlashcardComponent {
  constructor(private studySetService: StudySetService) { }

  cardScaleFactor: number = window.innerHeight * (496 / 720) / 282;
  //property named 'flashcards':
  flashcards: FlashcardData[] = [];

  //This is the current flashcard we are on.
  //currentFlashcard is the name and FlashcardData is the data type. The () means it is a default...
  //contstructor that is being called. We are creating a new flashcard with keyword new.
  currentFlashcard: FlashcardData = new FlashcardData();
  /*
  'flashcards' property is an array that holds objects of type FlashcardData.
  The part after the equal sign is an empty array.
  We are assigning the array of type FlashCard Data to an empty array.
  */
  currentCardIndex: number = 0; //used later on

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.cardScaleFactor = window.innerHeight * (496 / 720) / 282;
  }

  ngOnInit() {
    //ng on in it is initialized when the page loads
    //call the getStudySets function using studySetServices which we've injected into this component.
    /* This method returns an observable, which is like a stream of data that we can subscribe to and
    we want to be notified when the data is available:
    */
    this.studySetService.getStudySet("aaaa").subscribe(
      //IF the data IS available, THEN we call this studySets function defined below.
      /*This method takes a parameter that is an array of StudySetData objects which has been fetched
      by the method call above.
      The => arrow is just used to define the function.
      */
      (studySet) => {
        //Now, inside the function we process the fetched data
        //We use a flatMap function to iterate over our fetched data and extract our list of cards
         this.flashcards = studySet.flashcards;
         this.currentFlashcard =  this.flashcards[0];
      }
    );
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
    return this.flashcards.findIndex(card => card === this.currentFlashcard) > 0;
  }

  hasNextCard(): boolean {
    return this.flashcards.findIndex(card => card === this.currentFlashcard) < this.flashcards.length - 1;
  }

  calculateProgress(): number {
    const currentIndex = this.flashcards.findIndex(card => card === this.currentFlashcard);
    const totalCards = this.flashcards.length;
    if (totalCards === 0) {
      return 0; // Prevent division by zero
    }
    return ((currentIndex + 1) / totalCards) * 100; // Calculate progress as a percentage
  }
  }

