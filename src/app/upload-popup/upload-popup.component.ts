import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle } from '@angular/material/dialog';
import { FlashcardEditorComponent } from '../flashcard-editor/flashcard-editor.component';
import { FlashcardData } from '../data-models/flashcard-model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { maxTextImage } from '../utilities/constants';

@Component({
  selector: 'app-upload-popup',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogTitle, CommonModule, MatButtonModule, MatIcon],
  templateUrl: './upload-popup.component.html',
  styleUrl: './upload-popup.component.scss'
})
export class UploadPopupComponent {
  data: string = "";
  maxTextImage: number = maxTextImage;

  constructor(
    public dialogRef: MatDialogRef<FlashcardEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public flashcard: FlashcardData
  ) {}

  uploadImage(selectedImage: any) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      this.data = <string>reader.result;
    });
    reader.readAsDataURL(selectedImage.files[0]);
  }

  close() {
    this.dialogRef.close({data: ""});
  }

  saveClose() {
    this.dialogRef.close({data: this.data});
  }
}
