// flashcard.component.ts
import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [MatIconModule],
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