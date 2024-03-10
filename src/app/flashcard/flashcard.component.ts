// flashcard.component.ts
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-flashcard',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})

export class FlashcardComponent {
  @ContentChild(TemplateRef) addOns!: TemplateRef<any>;
  frontText: string = 'term';
  backText: string = 'definition';
  isFlipped: boolean = false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
}
