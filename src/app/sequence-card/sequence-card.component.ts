import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardData } from '../data-models/flashcard-model';
import { EnlargedFlashcardComponent } from '../enlarged-flashcard/enlarged-flashcard.component'

@Component({
  selector: 'app-sequence-card',
  standalone: true,
  imports: [CommonModule, FlashcardComponent, MatButtonModule, MatIconModule, EnlargedFlashcardComponent],
  templateUrl: './sequence-card.component.html',
  styleUrl: './sequence-card.component.scss'
})
export class SequenceCardComponent{
  @Input() flashcard?: FlashcardData;
  @Output() addToSeqEvent: EventEmitter<FlashcardData> = new EventEmitter();
  @Output() removeFromSeqEvent: EventEmitter<FlashcardData> = new EventEmitter();
  scaleFactor: number = window.innerWidth * (220 / 1280) / 500;
  @Input() inSequence: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.scaleFactor= window.innerWidth * (220 / 1280) / 500;
  }

  addToSequence(flashcard: FlashcardData, e: Event) {
    this.addToSeqEvent.emit(flashcard);
    e.stopPropagation();
  }

  expand(e: Event) {
    e.stopPropagation();
  }

  removeFromSequence(flashcard: FlashcardData, e: Event) {
    this.removeFromSeqEvent.emit(flashcard);
    e.stopPropagation();
  }

  showEnlargedFlashcard: boolean = false;

  showBigFlashcard(clickedFlashcard: FlashcardData) {
    // Toggle the boolean to show/hide the enlarged flashcard
    this.showEnlargedFlashcard = !this.showEnlargedFlashcard;
  }

  closeEnlargedFlashcard() {
    this.showEnlargedFlashcard = false;
  }
}