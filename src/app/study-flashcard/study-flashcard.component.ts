import { Component, HostListener } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';
import { StudySetService } from '../services/study-set.service';
import { FlashcardData } from '../data-models/flashcard-model';
import { StudySetData } from '../data-models/studyset-model';

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

fetchFlashcards() {
  //call the getStudySets function using studySetServices which we've injected into this component.
  /* This method returns an observable, which is like a stream of data that we can subscribe to and 
  we want to be notified when the data is available:
  */
  this.studySetService.getStudySets().subscribe(
    //IF the data IS available, THEN we call this studySets function defined below.
    /*This method takes a parameter that is an array of StudySetData objects which has been fetched
    by the method call above.
    The => arrow is just used to define the function.
    */ 
    (studySets: StudySetData[]) => {
      //Now, inside the function we process the fetched data
      //We use a flatMap function to iterate over our fetched data and extract our list of cards
      const allFlashcards: FlashcardData[]= studySets.flatMap(set => set.flashcards);

      this.flashcards = allFlashcards;
    }
  );
}