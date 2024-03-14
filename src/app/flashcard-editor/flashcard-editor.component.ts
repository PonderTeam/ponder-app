import { Input, Output, Component, EventEmitter} from '@angular/core';
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
  CdkDragStart,
  DragDropModule,
  moveItemInArray
} from '@angular/cdk/drag-drop';

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
  @Input() flashcards: FlashcardData[] = [new FlashcardData];
  @Output() selectCardEvent = new EventEmitter<FlashcardData>;
  selectedCard: FlashcardData = this.flashcards[0];
  highlight: boolean = true;

  drag(event: CdkDragStart) {
    this.highlight = false;
    console.log("bloop")
  };

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.flashcards, event.previousIndex, event.currentIndex)
    this.highlight = true;
  }

  onPreviewSelect(flashcard: FlashcardData) {
    this.selectedCard = flashcard;
    this.selectCardEvent.emit(this.selectedCard);
    this.highlight = true;
  }
}
