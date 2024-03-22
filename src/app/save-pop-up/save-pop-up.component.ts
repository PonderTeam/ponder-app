import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle } from '@angular/material/dialog';
import { EditCreateStudySetComponent } from '../edit-create-study-set/edit-create-study-set.component';

export interface DialogData {
  setName: string;
}
@Component({
  selector: 'app-save-pop-up',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './save-pop-up.component.html',
  styleUrl: './save-pop-up.component.scss'
})
export class SavePopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<EditCreateStudySetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCloseClick(): void {
      this.dialogRef.close();
  }
}
