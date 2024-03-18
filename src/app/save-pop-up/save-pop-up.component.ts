import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
