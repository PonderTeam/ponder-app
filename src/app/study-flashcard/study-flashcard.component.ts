import { Component, HostListener } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';

@Component({
  selector: 'app-study-flashcard',
  standalone: true,
  imports: [FlashcardComponent, ReturnRibbonComponent],
  templateUrl: './study-flashcard.component.html',
  styleUrl: './study-flashcard.component.scss'
})
export class StudyFlashcardComponent {
  cardScaleFactor: number = window.innerWidth * (880 / 1280) / 500;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.cardScaleFactor= window.innerWidth * (880 / 1280) / 500;
  }
}
