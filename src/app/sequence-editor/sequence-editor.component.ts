import { Component, HostListener, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { SequenceData } from '../data-models/sequence-model';
import { FlashcardData } from '../data-models/flashcard-model';
import { EcCardPreviewComponent } from '../ec-card-preview/ec-card-preview.component';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { calculateScaleFactor } from '../utilities/calculate-scaler';
import { seqEditPreviewHeightSF, seqEditPreviewWidthSF } from '../utilities/constants';

@Component({
    selector: 'app-sequence-editor',
    standalone: true,
    templateUrl: './sequence-editor.component.html',
    styleUrl: './sequence-editor.component.scss',
    imports: [
        CommonModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatIconModule,
        FlashcardComponent,
        EcCardPreviewComponent,
        DragDropModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule
    ]
})
export class SequenceEditorComponent {
  /** Flashcard scale factor */
  cardScaleFactor: number = calculateScaleFactor(seqEditPreviewWidthSF, seqEditPreviewHeightSF);;
  _sequences: SequenceData[] = [];
  selectedSequence: SequenceData | undefined = undefined;
  _flashcards: FlashcardData[] = [];
  selectedFlashcard: FlashcardData = new FlashcardData();
  filteredCards: FlashcardData[] = [];
  searchtext: any;
  items: any[] = this._sequences;
  currentCardIndex: number = 0;

  @Output() addSequenceEvent = new EventEmitter();
  @Output() removeSequenceEvent = new EventEmitter();

  @Input() set sequences(sequence:SequenceData[]) {
    this._sequences = sequence;
    if(sequence.length != 0) {
      this.selectedSequence = this.sequences[0];
    }
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

  ngOnInit() {
    this.filteredCards = this.flashcards;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.cardScaleFactor = calculateScaleFactor(seqEditPreviewWidthSF, seqEditPreviewHeightSF);
  }

  addToSequence(flashcard: FlashcardData) {
    if(this.selectedSequence != undefined) {
      this.selectedSequence.addCard(flashcard);
    }
  }

  addSequence(){
    this.addSequenceEvent.emit(true);
  }

  removeSequence(seq: SequenceData) {
    this.selectedSequence = undefined;
    this.removeSequenceEvent.emit(seq);
  }

  removeFromSequence(flashIndex: number) {
    if(this.selectedSequence != undefined) {
      this.selectedSequence.removeCardAtIndex(flashIndex);
    }
  }

  onPreviewSelectSeq(sequence: SequenceData) {
    this.selectedSequence = sequence;
  }

  onPreviewSelectFlashcard(flashcard: FlashcardData) {
    this.selectedFlashcard = flashcard;
    this.currentCardIndex = this.filteredCards.findIndex(
      (flashcard)=>flashcard == this.selectedFlashcard);
  }

  drop(event: CdkDragDrop<string[]>) {
    if(this.selectedSequence != undefined) {
      moveItemInArray(this.selectedSequence.cardList, event.previousIndex, event.currentIndex);
    }
  }

  filterItems(filterValue: string) {
    this.filteredCards = this.flashcards.filter(
      item => item.term.toLowerCase().includes(filterValue.toLowerCase()));
    this.currentCardIndex = this.filteredCards.findIndex(
      (flashcard)=>flashcard == this.selectedFlashcard);
  }

  previousFlashcard() {
    if (this.hasPreviousCard()) {
      this.currentCardIndex--;
      this.selectedFlashcard = this.filteredCards[this.currentCardIndex];
    }
  }

  nextFlashcard() {
    if (this.hasNextCard()) {
      this.currentCardIndex++;
      this.selectedFlashcard = this.filteredCards[this.currentCardIndex];
    }
  }

  hasPreviousCard(): boolean {
    return this.currentCardIndex > 0;
  }

  hasNextCard(): boolean {
    return this.currentCardIndex < (this.filteredCards.length - 1);
  }
}
