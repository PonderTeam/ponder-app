import { Component, Inject, HostListener } from '@angular/core';
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
import { calculateScaleFactor } from '../utilities/calculate-scaler';

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
  private readonly widthSF = (880 / 1280);
  private readonly heightSF = (496 / 720);
  scaleFactor: number = calculateScaleFactor(this.widthSF, this.heightSF);

  constructor(
    public dialogRef: MatDialogRef<SequenceCardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FlashcardData
  ) {}

  onCloseClick(): void {
      this.dialogRef.close();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.scaleFactor = calculateScaleFactor(this.widthSF, this.heightSF);
  }
}
