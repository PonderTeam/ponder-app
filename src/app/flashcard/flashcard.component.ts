import { Component, Input, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardData } from '../data-models/flashcard-model';
import { ImageService } from '../services/image/image.service';
import { flashcardBaseHeight, flashcardBaseWidth } from '../utilities/constants';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})

export class FlashcardComponent implements OnInit{
  private _flashcard: FlashcardData;
  @Input() scaleFactor: number = 1;
  @Input() flippable: boolean = true;
  @Input() frontSide: boolean = true;
  @Input() set flashcard(data: FlashcardData) {
    if(this.isFlipped && this.frontSide){
      this.isFlipped = false;
      setTimeout(() => {
        this._flashcard = data;
      }, 150);
    } else {
      this._flashcard = data;
    }
  };

  get flashcard(): FlashcardData {
    return this._flashcard;
  }

  protected height: number = flashcardBaseHeight * this.scaleFactor;
  protected width: number = flashcardBaseWidth * this.scaleFactor;

  isFlipped: boolean = false;

  constructor(protected imageService: ImageService) {
    this._flashcard = new FlashcardData('error', 'error');
  }

  ngOnInit(): void {
    this.onResize();
    if(!this.frontSide) {
      this.isFlipped = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = flashcardBaseHeight * this.scaleFactor;
    this.width = flashcardBaseWidth * this.scaleFactor;
  }

  flipCard() {
    if(this.flippable) {
      this.isFlipped = !this.isFlipped;
    }
  }
}
