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
  image: string = "";
  data: File = new File([], "");
  maxTextImage: number = maxTextImage;
  flashcardDefinitionLength: number = 0;

  constructor(
    public dialogRef: MatDialogRef<FlashcardEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public flashcard: FlashcardData
  ) {}

  ngOnInit(){
    this.flashcardDefinitionLength = this.removeHTMLTags(this.flashcard.definition).length
  }

  uploadImage(selectedImage: any) {
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      this.image = <string>reader.result;
      this.data = selectedImage.files[0];
    })
    reader.readAsDataURL(selectedImage.files[0])
  }

  close() {
    this.dialogRef.close({data: ""});
  }

  saveClose() {
    this.dialogRef.close({data: this.data});
  }

  removeHTMLTags(s: string){
    const pattern = new RegExp("\\<.*?\\>|&nbsp",'g');
    s = new String(s).replace(pattern, "");
    console.log()
    return s;
  }
}
