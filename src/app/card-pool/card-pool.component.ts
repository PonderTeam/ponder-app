import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlashcardData } from '../data-models/flashcard-model';
import { MatGridListModule } from '@angular/material/grid-list';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

interface PoolItem {
  card: FlashcardData,
  show: boolean,
  x: number,
  y: number,
}

@Component({
  selector: 'app-card-pool',
  standalone: true,
  imports: [MatGridListModule, SequenceCardComponent, DragDropModule],
  templateUrl: './card-pool.component.html',
  styleUrl: './card-pool.component.scss'
})
export class CardPoolComponent {
  flashcardsMap?: Map<string, PoolItem> = new Map<string, PoolItem>([
    ["1", {card: new FlashcardData("1"), show:false, x:0, y:0}],
    ["2", {card: new FlashcardData("2"), show:false, x:0, y:0}],
    ["3", {card: new FlashcardData("1"), show:false, x:0, y:0}],
  ]);
  @Output() addToSeqEvent: EventEmitter<FlashcardData> = new EventEmitter();

  addToSeq(item: PoolItem) {
    item.show = false;
    this.addToSeqEvent.emit(item.card);
  }
}
