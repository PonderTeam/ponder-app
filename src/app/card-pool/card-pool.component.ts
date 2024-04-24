import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { CommonModule } from '@angular/common';
import { CardMap, DragItem } from '../study-sequence/study-sequence.component';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-card-pool',
  standalone: true,
  imports: [SequenceCardComponent, CommonModule, DragDropModule],
  templateUrl: './card-pool.component.html',
  styleUrl: './card-pool.component.scss'
})
export class CardPoolComponent {
  tempItems: DragItem[]= [];
  @Input() showBackArea: boolean = false;
  @Output() backAreaEvent: EventEmitter<boolean> = new EventEmitter();
  @Input() cardPool: DragItem[] = [];
  @Output() addToSeqEvent: EventEmitter<CardMap> = new EventEmitter();

  addToSeq(item: CardMap) {
    this.addToSeqEvent.emit(item);
  }

  backdrop(event: CdkDragDrop<DragItem[]>) {
    const dragItem: DragItem = event.previousContainer.data as any;
    const index = dragItem[event.previousIndex].key;
    transferArrayItem(
      dragItem,
      this.cardPool[index],
      event.previousIndex,
      event.currentIndex
    );
  }

  // Prevents direct backdrop and cardPool reordering
  noReturnPredicate() {
    return false;
  }
}
