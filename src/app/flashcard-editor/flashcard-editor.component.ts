import { Input, Component, EventEmitter, Output, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { EcCardPreviewComponent } from '../ec-card-preview/ec-card-preview.component';
import { FlashcardData } from '../data-models/flashcard-model';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import $ from "jquery";
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UploadPopupComponent } from '../upload-popup/upload-popup.component';
import { ImageService } from '../services/image/image.service';
import { maxText, maxTextImage } from '../utilities/constants';

import { CKEditorComponent, CKEditorModule } from '@ckeditor/ckeditor5-angular';
import Editor from 'ckeditor5-custom-build/build/ckeditor';

@Component({
  selector: 'app-flashcard-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonToggleModule,
    MatCardModule,
    MatIconModule,
    EcCardPreviewComponent,
    DragDropModule,
    CKEditorModule,
    MatDialogModule
  ],
  templateUrl: './flashcard-editor.component.html',
  styleUrl: './flashcard-editor.component.scss'
})
export class FlashcardEditorComponent implements AfterViewInit{
  _flashcards: FlashcardData[] = [];
  selectedCard: FlashcardData = new FlashcardData("error", "error");
  selectedIndex: number = 0;
  highlight: boolean = true;
  hoverImage: boolean = false;
  maxText: number = maxText;
  maxTextImage: number = maxTextImage;
  public Editor = Editor;
  editorConfig = {
    plugins:['Bold','Italic','Underline','Essentials','Paragraph'],
  }

  @ViewChild('editor') editor!:CKEditorComponent;

  @Output() addCardEvent = new EventEmitter<void>;
  @Output() removeCardEvent = new EventEmitter<FlashcardData>;

  @Input() set flashcards(card: FlashcardData[]) {
    this._flashcards = card;
    this.selectedCard = this.flashcards[0];
  }
  get flashcards() {
    return this._flashcards;
  }

  constructor(
    private dialogRef: MatDialog,
    protected imageService: ImageService
  ) {}

  ngAfterViewInit() {
    this.handlePaste();
  }

  ngAfterViewChecked() {
    this.placeDeleteButton();
  }

  drag(flashcard: FlashcardData, index: number) {
    this.selectedCard = flashcard;
    this.selectedIndex = index;
    this.highlight = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.flashcards, event.previousIndex, event.currentIndex);
    this.selectedIndex = this.flashcards.indexOf(this.selectedCard);
    this.highlight = true;
  }

  onPreviewSelect(flashcard: FlashcardData, index: number) {
    this.selectedCard = flashcard;
    this.selectedIndex = index;
    this.highlight = true;
  }

  addCard() {
    this.addCardEvent.emit();
  }

  removeCard(flashcard: FlashcardData) {
    this.removeImage();
    if (this.selectedIndex == 0 && this._flashcards.length == 1) {
      this.addCard();
    }
    if (this.selectedIndex == 0) {
      this.selectedCard = this._flashcards[1];
    } else {
      this.selectedIndex--;
      this.selectedCard = this.flashcards[this.selectedIndex];
    }
    this.removeCardEvent.emit(flashcard);
  }

  placeDeleteButton() {
    var rightWidth = $("#flashcard-tab-right").outerWidth();
    var buttonWidth = $("#delete-button").outerWidth()
    $('#delete-button').css({
        'left': (window.innerWidth*.5) + rightWidth! - buttonWidth! - 16
    });
  }

  uploadImage() {
    let dialog = this.dialogRef.open(
      UploadPopupComponent,
      { maxWidth: '100vh', data: this.selectedCard, disableClose: true}
    );

    dialog.afterClosed().subscribe(res => {
      if(res.data != "") {
        this.imageService.uploadImage(res.data).subscribe(imageId => {
          this.selectedCard.image = imageId;
        })
      }
    });
  }

  removeImage() {
    this.selectedCard.image = "";
  }

  checkLength(e: KeyboardEvent) {
    if (e.code != "Backspace" &&
        e.code != "ArrowLeft" &&
        e.code != "ArrowRight" &&
        e.code != "ArrowUp" &&
        e.code != "ArrowDown" &&
        !e.ctrlKey) {
      if (this.selectedCard.hasImage()){
        if (this.removeHTMLTags(this.selectedCard.definition).length >= maxTextImage){
          e.preventDefault();
          e.stopPropagation();
        }
      }
      else {
        if (this.removeHTMLTags(this.selectedCard.definition).length >= maxText){
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }
  }

  removeHTMLTags(s: string){
    const parser = new DOMParser();
    return parser.parseFromString(s, "text/html").documentElement.innerText;
  }

  handlePaste() {
    setTimeout(() => {
      const editorInstance = this.editor.editorInstance!;
      const editorDoc = editorInstance.editing.view.document!;
      editorDoc.on('paste', (event, data) => {
        const pastedContent = data.domEvent.clipboardData.getData("text/plain");
        const range = editorDoc.selection.getFirstRange();
        const selected = range!.end.offset - range!.start.offset;
        var charRemaining = maxText - this.removeHTMLTags(this.selectedCard.definition).length + selected;
        if (this.selectedCard.hasImage()) {
          charRemaining = maxTextImage - this.removeHTMLTags(this.selectedCard.definition).length + selected;
        }
        if (charRemaining < pastedContent.length) {
          event.stop();
          alert("You cannot paste. Your paste would excede the word limit.");
        }
      });
    }, 0);
  }
}
