import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { CardMap } from '../study-sequence/study-sequence.component';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, DragDropModule, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-sequence-sidebar',
  standalone: true,
  imports: [SequenceCardComponent, MatIconModule, DragDropModule],
  templateUrl: './sequence-sidebar.component.html',
  styleUrl: './sequence-sidebar.component.scss'
})
export class SequenceSidebarComponent {
  @Input() userSequence: CardMap[] = [];
  @Output() removeFromSeqEvent: EventEmitter<CardMap> = new EventEmitter<CardMap>;

  removeFromSeq(item: CardMap) {
    this.removeFromSeqEvent.emit(item);
  }

  drop(event: CdkDragDrop<CardMap[]>) {
    if (event.previousContainer === event.container){
      moveItemInArray(this.userSequence, event.previousIndex, event.currentIndex);
    }
    else{
      //Logic to add from pool to sidebar sequence
      console.log("Logic to add to seqeuence here");
      console.log(event);
      console.log(event.previousContainer.data[event.previousIndex]);
      //this.userSequence.push(event.previousContainer.data[event.previousIndex]);
      //copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
