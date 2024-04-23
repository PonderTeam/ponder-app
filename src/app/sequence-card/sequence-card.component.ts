import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardData } from '../data-models/flashcard-model';
import { EnlargedFlashcardComponent } from '../enlarged-flashcard/enlarged-flashcard.component'
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-sequence-card',
  standalone: true,
  imports: [CommonModule,
    FlashcardComponent,
    MatButtonModule,
    MatIconModule,
    EnlargedFlashcardComponent,
    MatDialogModule],
  templateUrl: './sequence-card.component.html',
  styleUrl: './sequence-card.component.scss'
})
export class SequenceCardComponent{
  @Input() flashcard?: FlashcardData;
  @Output() addToSeqEvent: EventEmitter<FlashcardData> = new EventEmitter();
  @Output() removeFromSeqEvent: EventEmitter<FlashcardData> = new EventEmitter();
  @Input() inSequence: boolean = false;

  constructor(
    private dialogRef: MatDialog
  ){}

  addToSequence(flashcard: FlashcardData, e: Event) {
    this.addToSeqEvent.emit(flashcard);
    e.stopPropagation();
  }

  removeFromSequence(flashcard: FlashcardData, e: Event) {
    this.removeFromSeqEvent.emit(flashcard);
    e.stopPropagation();
  }

  showBigFlashcard() {
    this.dialogRef.open(
      EnlargedFlashcardComponent,
      {maxWidth: '100vw', maxHeight: '100vh', data: this.flashcard}
    );
  }
}
