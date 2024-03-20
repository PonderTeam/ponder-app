import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle } from '@angular/material/dialog';
import { ViewstudysetComponent } from '../viewstudyset/viewstudyset.component';

@Component({
  selector: 'app-share-pop-up',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './share-pop-up.component.html',
  styleUrl: './share-pop-up.component.scss'
})
export class SharePopUpComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewstudysetComponent>,
    @Inject(MAT_DIALOG_DATA) public url: string
  ) {}

  onShareClick(): void {
      this.dialogRef.close();
  }
}
