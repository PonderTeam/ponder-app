import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FlashcardData } from '../data-models/flashcard-model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-enlarged-flashcard',
  standalone: true,
  imports: [ FlashcardComponent, MatIconModule],
  templateUrl: './enlarged-flashcard.component.html',
  styleUrl: './enlarged-flashcard.component.scss'
})
export class EnlargedFlashcardComponent {
  @Input() flashcard: FlashcardData | undefined;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  closeEnlargedFlashcard() {
    this.close.emit();
  }
}