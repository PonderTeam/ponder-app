import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sequence-card',
  standalone: true,
  imports: [CommonModule, FlashcardComponent, MatButtonModule, MatIconModule],
  templateUrl: './sequence-card.component.html',
  styleUrl: './sequence-card.component.scss'
})
export class SequenceCardComponent extends FlashcardComponent{
  term: string  = "term";
  inSequence: boolean = true;

  addToSequence(e: Event) {
    e.stopPropagation();
    this.inSequence = true;
  }

  expand(e: Event) {
    e.stopPropagation();
  }

  removeFromSequence() {
    this.inSequence = false;
  }
}
