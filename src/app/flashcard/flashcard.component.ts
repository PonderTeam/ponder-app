// flashcard.component.ts
import { Component, ContentChild, Input, TemplateRef, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

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
  height: number = 282 * this.scaleFactor;

  frontText: string = 'term';
  backText: string = 'definition';
  isFlipped: boolean = false;

  ngOnInit(): void {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.height = 282 * this.scaleFactor;;
  }

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
