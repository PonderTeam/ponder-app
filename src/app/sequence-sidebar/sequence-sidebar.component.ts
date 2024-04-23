import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { CardMap } from '../study-sequence/study-sequence.component';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem, CdkDragStart} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sequence-sidebar',
  standalone: true,
  imports: [CommonModule, SequenceCardComponent, MatIconModule, DragDropModule],
  templateUrl: './sequence-sidebar.component.html',
  styleUrl: './sequence-sidebar.component.scss'
})
export class SequenceSidebarComponent {
  @Input() userSequence: CardMap[] = [];
  @Output() backAreaEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() removeFromSeqEvent: EventEmitter<CardMap> = new EventEmitter<CardMap>;

  removeFromSeq(item: CardMap) {
    this.removeFromSeqEvent.emit(item);
  }

  directDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onMouseDown(event: any) {
    this.backAreaEvent.emit(true);
  }

  onMouseUp(event: any) {
    this.backAreaEvent.emit(false);
  }

  onDragResultStarted(event:CdkDragStart) {
    this.backAreaEvent.next(true);
  }

  onDragResultReleased(event: CdkDragStart) {
    this.backAreaEvent.next(false);
  }
}
