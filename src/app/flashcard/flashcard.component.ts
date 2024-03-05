// flashcard.component.ts
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [],
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent {
  frontText: string = 'term';
  backText: string = 'definition';
  isFlipped: boolean = false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}