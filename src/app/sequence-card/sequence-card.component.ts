import { Component } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sequence-card',
  standalone: true,
  imports: [FlashcardComponent, MatButtonModule, MatIconModule],
  templateUrl: './sequence-card.component.html',
  styleUrl: './sequence-card.component.scss'
})
export class SequenceCardComponent extends FlashcardComponent{
  inSequence: boolean = false;

  addToSequence(e: Event) {
    e.stopPropagation();
    this.inSequence = true;
  }

  expand(e: Event) {
    e.stopPropagation();
  }
}
