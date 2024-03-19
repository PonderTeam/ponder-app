import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlashcardData } from '../data-models/flashcard-model';
import { MatGridListModule } from '@angular/material/grid-list';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card-pool',
  standalone: true,
  imports: [MatGridListModule, SequenceCardComponent, DragDropModule],
  templateUrl: './card-pool.component.html',
  styleUrl: './card-pool.component.scss'
})
export class CardPoolComponent {
  flashcardsMap?: Map<FlashcardData, boolean> = new Map<FlashcardData, boolean>([
    [new FlashcardData("1"), true],
    [new FlashcardData("2"), true],
    [new FlashcardData("3"), true],
  ]);
  @Output() addToSeqEvent: EventEmitter<FlashcardData> = new EventEmitter();
  addToSeq(flashcard: FlashcardData, show: boolean) {
    this.flashcardsMap?.set(flashcard, show);
    this.addToSeqEvent.emit(flashcard);
  }
}
