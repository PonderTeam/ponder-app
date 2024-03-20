import { Component, HostListener, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FlashcardEditorComponent } from '../flashcard-editor/flashcard-editor.component';
import { SequenceData } from '../data-models/sequence-model';

@Component({
  selector: 'app-sequence-editor',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatIconModule, FlashcardComponent,FlashcardEditorComponent],
  templateUrl: './sequence-editor.component.html',
  styleUrl: './sequence-editor.component.scss'
})
export class SequenceEditorComponent {
  cardScaleFactor: number = window.innerWidth * (880 / 1280) / 1700;
  _sequences: SequenceData[] = [];
  @Output() addSequenceEvent = new EventEmitter();
  selectedSequence: SequenceData = new SequenceData("error");
  @Input() set sequences(sequence:SequenceData[]) {
    this._sequences = sequence;
    this.selectedSequence = this.sequences[0];
  }

  get sequences() {
    return this._sequences;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.cardScaleFactor = window.innerWidth * (880 / 1280) / 1700;
  }

  addToSequence(e: Event) {
    e.stopPropagation();
  }

  addSequence(){
    this.addSequenceEvent.emit(true);
  }
  onPreviewSelect(sequence: SequenceData){
    this.selectedSequence = sequence;
    console.log("select?")
  }
}
