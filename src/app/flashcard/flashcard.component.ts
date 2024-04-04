// flashcard.component.ts
import { Component, ContentChild, Input, TemplateRef, HostListener, OnInit } from '@angular/core';
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
  // Used to get additional template + styling from other components
  @ContentChild(TemplateRef) addOns!: TemplateRef<any>;
  // Gets a scale factor to resize the component
  @Input() scaleFactor: number = 1;
  // Input property so parent component can pass FlashcardData object to the component 
  @Input() flashcard: FlashcardData | undefined;

  //calculates initial size of the flashcard
  height: number = 282 * this.scaleFactor;
  width: number = 500 * this.scaleFactor;

  //isFlipped is intially set to false to indicate that card is not flipped by default
  isFlipped: boolean = false;

  //initial height and width of flashcard is set based on the scaleFactor
  ngOnInit(): void {
    this.onResize();
  }

  //Listens for window size change and adjusts height and width of flashcard as needed
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = 282 * this.scaleFactor;
    this.width = 500 * this.scaleFactor;
  }

  //method shows front or back of card. Upon method call, property is set to true to flip to other side. 
  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
