// flashcard.component.ts
import { Component, ContentChild, Input, TemplateRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { FlashcardData } from '../data-models/flashcard-model';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})

export class FlashcardComponent implements OnInit{
  // Used to get additional template + styling from other components
  @ContentChild(TemplateRef) addOns!: TemplateRef<any>;
  // Gets a scale factor to resize the component
  @Input() scaleFactor: number = 1;
  @Input() flashcard: FlashcardData = new FlashcardData('error', 'error');
  height: number = 282 * this.scaleFactor;
  width: number = 500 * this.scaleFactor;
  isFlipped: boolean = false;

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = 282 * this.scaleFactor;
    this.width = 500 * this.scaleFactor;
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
