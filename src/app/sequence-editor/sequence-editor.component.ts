import { Component, HostListener, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FlashcardEditorComponent } from '../flashcard-editor/flashcard-editor.component';
import { SequenceData } from '../data-models/sequence-model';
import { FlashcardData } from '../data-models/flashcard-model';

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
  selectedSequence: SequenceData = new SequenceData("error");
  _flashcards: FlashcardData[] = [];
  selectedFlashcard: FlashcardData = new FlashcardData();

  @Output() addSequenceEvent = new EventEmitter();
  @Output() removeSequenceEvent = new EventEmitter();

  @Input() set sequences(sequence:SequenceData[]) {
    this._sequences = sequence;
    this.selectedSequence = this.sequences[0];
  }
  @Input() set flashcards(flashcards:FlashcardData[]) {
    this._flashcards = flashcards;
    this.selectedFlashcard = this.flashcards[0];
  }

  get sequences() {
    return this._sequences;
  }

  get flashcards() {
    return this._flashcards;
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

  removeSequence(seq: SequenceData){
    this.selectedSequence = seq;
    this.removeSequenceEvent.emit(seq);
  }

  onPreviewSelectSeq(sequence: SequenceData){
    this.selectedSequence = sequence;
  }

  onPreviewSelectFlashcard(flashcard: FlashcardData){
    this.selectedFlashcard = flashcard;
  }

}
