import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FlashcardData } from '../data-models/flashcard-model';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle } from '@angular/material/dialog';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-enlarged-flashcard',
  standalone: true,
  imports: [ FlashcardComponent, 
    MatIconModule, 
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions,
    MatButtonModule],
  templateUrl: './enlarged-flashcard.component.html',
  styleUrl: './enlarged-flashcard.component.scss'
})
export class EnlargedFlashcardComponent {

  constructor(
    public dialogRef: MatDialogRef<SequenceCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FlashcardData
  ) {}

  onCloseClick(): void {
      this.dialogRef.close();
  }
}
