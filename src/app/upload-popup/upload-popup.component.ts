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

@Component({
  selector: 'app-upload-popup',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogTitle, CommonModule, MatButtonModule, MatIcon],
  templateUrl: './upload-popup.component.html',
  styleUrl: './upload-popup.component.scss'
})
export class UploadPopupComponent {
  imageData: string = "";

  constructor(
    protected imageService: ImageService,
    public dialogRef: MatDialogRef<FlashcardEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public flashcard: FlashcardData
  ) {}

  loadImage() {
    this.imageService.loadImage(this.flashcard.image).subscribe(res => {
      console.log(res);
      this.imageData = res;
    });
  }

  uploadImage(selectedImage: any) {
    this.imageService.uploadImage(selectedImage.files[0]).subscribe((res) => {
      console.log(res);
      this.flashcard.image = res;
      this.loadImage();
    });
  }

  removeImage() {
    this.flashcard.image = "";
    var file = <HTMLInputElement>document.getElementById("selected-image");
    file.value = file.defaultValue;
  }

  close() {
    this.dialogRef.close();
  }
}
