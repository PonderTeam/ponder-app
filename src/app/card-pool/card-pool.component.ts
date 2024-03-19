import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlashcardData } from '../data-models/flashcard-model';
import { MatGridListModule } from '@angular/material/grid-list';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';
import { CardMap } from '../study-sequence/study-sequence.component';

interface PoolItem {
  card: FlashcardData,
  show: boolean,
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
  flashcardsMap: Map<number, PoolItem> = new Map<number, PoolItem>();
  @Output() addToSeqEvent: EventEmitter<CardMap> = new EventEmitter();
  @Input() visUpdates?: Observable<CardMap>;
  @Input() set cardPool(items: CardMap[]) {
    const temp = new Map<number, PoolItem>()
    items.map(item => {
      temp.set(item.key, {card: item.card, show: true});
    });
    this.flashcardsMap = temp;
  }

  ngOnInit() {
    this.visSubscription = this.visUpdates!
      .subscribe(item => this.updateVisibility(item.key))
  }

  addToSeq(item: CardMap) {
    this.flashcardsMap.get(item.key)!.show = false;
    this.addToSeqEvent.emit(item);
  }

  updateVisibility(fid: number) {
    this.flashcardsMap!.get(fid)!.show = true;
  }
}
