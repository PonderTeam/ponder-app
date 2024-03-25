import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { CardMap } from '../study-sequence/study-sequence.component';
import {MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sequence-sidebar',
  standalone: true,
  imports: [SequenceCardComponent, MatIconModule],
  templateUrl: './sequence-sidebar.component.html',
  styleUrl: './sequence-sidebar.component.scss'
})
export class SequenceSidebarComponent {
  @Input() userSequence: CardMap[] = [];
  @Output() removeFromSeqEvent: EventEmitter<CardMap> = new EventEmitter<CardMap>;

  removeFromSeq(item: CardMap) {
    this.removeFromSeqEvent.emit(item);
  }
}
