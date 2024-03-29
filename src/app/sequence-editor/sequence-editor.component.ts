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
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    FlashcardComponent,
    FlashcardEditorComponent
  ],
  templateUrl: './sequence-editor.component.html',
  styleUrl: './sequence-editor.component.scss'
})
export class SequenceEditorComponent {
  /** Flashcard width scale factor constant */
  private readonly widthSF = (300 / 1280) / 500;
  /** Flashcard height scale factor constant */
  private readonly heightSF = (168 / 720) / 282;
  /** Flashcard scale factor */
  cardScaleFactor: number = this.calculateScaleFactor();
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

  get sequences() {
    return this._sequences;
  }

  @Input() set flashcards(flashcards:FlashcardData[]) {
    this._flashcards = flashcards;
    this.selectedFlashcard = this.flashcards[0];
  }

  get flashcards() {
    return this._flashcards;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.cardScaleFactor = this.calculateScaleFactor();
  }

  addToSequence(e: Event) {
    e.stopPropagation();
  }

  addSequence(){
    this.addSequenceEvent.emit(true);
  }

  removeSequence(seq: SequenceData) {
    this.selectedSequence = seq;
    this.removeSequenceEvent.emit(seq);
  }

  onPreviewSelectSeq(sequence: SequenceData) {
    this.selectedSequence = sequence;
  }

  onPreviewSelectFlashcard(flashcard: FlashcardData) {
    this.selectedFlashcard = flashcard;
  }

  calculateScaleFactor() {
    return Math.min(
      window.innerWidth * this.widthSF,
      window.innerHeight * this.heightSF
    );
  }
}
