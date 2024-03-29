import { Input, Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EcCardPreviewComponent } from '../ec-card-preview/ec-card-preview.component';
import { FlashcardData } from '../data-models/flashcard-model';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import $ from "jquery";

@Component({
  selector: 'app-flashcard-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    EcCardPreviewComponent,
    DragDropModule
  ],
  templateUrl: './flashcard-editor.component.html',
  styleUrl: './flashcard-editor.component.scss'
})
export class FlashcardEditorComponent {
  _flashcards: FlashcardData[] = [];
  selectedCard: FlashcardData = new FlashcardData("error", "error");
  selectedIndex: number = 0;
  highlight: boolean = true;
  @Output() addCardEvent = new EventEmitter<void>;
  @Output() removeCardEvent = new EventEmitter<FlashcardData>;

  @Input() set flashcards(card: FlashcardData[]) {
    this._flashcards = card;
    this.selectedCard = this.flashcards[0];
  }
  get flashcards() {
    return this._flashcards;
  }

  ngAfterViewChecked() {
    this.placeDeleteButton();
  }

  drag(flashcard: FlashcardData, index: number) {
    this.selectedCard = flashcard;
    this.selectedIndex = index;
    this.highlight = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.flashcards, event.previousIndex, event.currentIndex);
    this.selectedIndex = this.flashcards.indexOf(this.selectedCard);
    this.highlight = true;
  }

  onPreviewSelect(flashcard: FlashcardData, index: number) {
    this.selectedCard = flashcard;
    this.selectedIndex = index;
    this.highlight = true;
  }

  addCard() {
    this.addCardEvent.emit();
  }

  removeCard(flashcard: FlashcardData) {
    if (this.selectedIndex == 0 && this._flashcards.length == 1) {
      this.addCard();
    }
    if (this.selectedIndex == 0) {
      this.selectedCard = this._flashcards[1]
    } else {
      this.selectedIndex--;
      this.selectedCard = this.flashcards[this.selectedIndex];
    }
    this.removeCardEvent.emit(flashcard);
  }

  placeDeleteButton() {
    var rightWidth = $("#flashcard-tab-right").outerWidth();
    var buttonWidth = $("#delete-button").outerWidth()
    $('#delete-button').css({
        'left': (window.innerWidth*.5) + rightWidth! - buttonWidth! - 16
    });
  }
}
