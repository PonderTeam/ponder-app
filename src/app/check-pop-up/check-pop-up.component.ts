import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { StudySequenceComponent } from '../study-sequence/study-sequence.component';

@Component({
  selector: 'app-check-pop-up',
  standalone: true,
  imports: [MatDialogActions, MatDialogTitle, MatButtonModule],
  templateUrl: './check-pop-up.component.html',
  styleUrl: './check-pop-up.component.scss'
})
export class CheckPopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<StudySequenceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
}
