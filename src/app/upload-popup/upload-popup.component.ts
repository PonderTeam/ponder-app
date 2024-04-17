import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogTitle } from '@angular/material/dialog';
import { FlashcardEditorComponent } from '../flashcard-editor/flashcard-editor.component';
import { FlashcardData } from '../data-models/flashcard-model';
import { ImageService } from '../services/image/image.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

interface UploadedImage {
  path: string;
  data: string;
}

@Component({
  selector: 'app-upload-popup',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogTitle, CommonModule, MatButtonModule, MatIcon],
  templateUrl: './upload-popup.component.html',
  styleUrl: './upload-popup.component.scss'
})
export class UploadPopupComponent {
  path: string = "";
  data: string = "";

  constructor(
    protected imageService: ImageService,
    public dialogRef: MatDialogRef<FlashcardEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public flashcard: FlashcardData
  ) {}

  uploadImage(selectedImage: any) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      var file = (<HTMLInputElement>document.getElementById("selected-image")).value;
      this.path = file;
      console.log(file);
      this.data = <string>reader.result;
    })
    reader.readAsDataURL(selectedImage.files[0])
  }

  removeImage() {
    this.path = "";
    this.data = "";
    var file = <HTMLInputElement>document.getElementById("selected-image");
    file.value = file.defaultValue;
  }

  close() {
    this.dialogRef.close({data: {path: "", data: ""}});
  }

  saveClose() {
    this.dialogRef.close({data: {path: this.path, data: this.data}})
  }
}
