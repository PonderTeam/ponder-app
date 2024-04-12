import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlashcardData } from '../data-models/flashcard-model';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { CardMap } from '../study-sequence/study-sequence.component';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

interface PoolItem {
  card: FlashcardData,
  show: boolean,
}

@Component({
  selector: 'app-card-pool',
  standalone: true,
  imports: [SequenceCardComponent, CommonModule, DragDropModule],
  templateUrl: './card-pool.component.html',
  styleUrl: './card-pool.component.scss'
})
export class CardPoolComponent {
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
    this.visUpdates!.subscribe(item => this.updateVisibility(item.key));
  }

  addToSeq(item: CardMap) {
    this.flashcardsMap.get(item.key)!.show = false;
    this.addToSeqEvent.emit(item);
  }

  updateVisibility(fid: number) {
    this.flashcardsMap.get(fid)!.show = !(this.flashcardsMap!.get(fid)!.show);
  }

  drop(event: CdkDragDrop<string[]>){
    //Insert logic from sequences side bar to card pool
    //console.log(event);
  }
}
