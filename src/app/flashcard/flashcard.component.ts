import { Component, Input, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FlashcardData } from '../data-models/flashcard-model';

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

  protected height: number = 282 * this.scaleFactor;
  protected width: number = 500 * this.scaleFactor;

  isFlipped: boolean = false;

  constructor(){
    this._flashcard = new FlashcardData('error', 'error')
  }

  ngOnInit(): void {
    this.onResize();
    if(!this.frontSide) {
      this.isFlipped = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = 282 * this.scaleFactor;
    this.width = 500 * this.scaleFactor;
  }

  flipCard() {
    if(this.flippable) {
      this.isFlipped = !this.isFlipped;
    }
  }
}
