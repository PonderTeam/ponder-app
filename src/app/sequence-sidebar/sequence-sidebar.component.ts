import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FlashcardData } from '../data-models/flashcard-model';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';

@Component({
  selector: 'app-sequence-sidebar',
  standalone: true,
  imports: [SequenceCardComponent],
  templateUrl: './sequence-sidebar.component.html',
  styleUrl: './sequence-sidebar.component.scss'
})
export class SequenceSidebarComponent {
  @Input() userSequence: FlashcardData[] = [];
  @Output() removeFromSeqEvent: EventEmitter<number> = new EventEmitter<number>;

  removeFromSeq(i: number) {
    this.removeFromSeqEvent.emit(i);
  }
}
