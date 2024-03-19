import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlashcardData } from '../data-models/flashcard-model';
import { MatGridListModule } from '@angular/material/grid-list';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

interface PoolItem {
  card: FlashcardData,
  show: boolean,
  x: number,
  y: number,
}

@Component({
  selector: 'app-card-pool',
  standalone: true,
  imports: [MatGridListModule, SequenceCardComponent, DragDropModule, CommonModule],
  templateUrl: './card-pool.component.html',
  styleUrl: './card-pool.component.scss'
})
export class CardPoolComponent {
  private visSubscription?: Subscription;
  flashcardsMap?: Map<string, PoolItem> = new Map<string, PoolItem>([
    ["1", {card: new FlashcardData("1"), show:true, x:0, y:0}],
    ["2", {card: new FlashcardData("2"), show:true, x:0, y:0}],
    ["3", {card: new FlashcardData("3"), show:true, x:0, y:0}],
    ["4", {card: new FlashcardData("4"), show:true, x:0, y:0}],
    ["5", {card: new FlashcardData("5"), show:true, x:0, y:0}],
    ["6", {card: new FlashcardData("6"), show:true, x:0, y:0}],
    ["7", {card: new FlashcardData("7"), show:true, x:0, y:0}],
    ["8", {card: new FlashcardData("8"), show:true, x:0, y:0}],
  ]);
  @Output() addToSeqEvent: EventEmitter<FlashcardData> = new EventEmitter();
  @Input() visUpdates?: Observable<string>;

  ngOnInit() {
    this.visSubscription = this.visUpdates!.subscribe(fid => this.updateVisibility(fid))
  }

  addToSeq(item: PoolItem) {
    item.show = false;
    this.addToSeqEvent.emit(item.card);
  }

  updateVisibility(fid: string) {
    this.flashcardsMap!.get(fid)!.show = true;
  }
}
