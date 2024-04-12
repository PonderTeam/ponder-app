import { Component, Input, HostListener } from '@angular/core';
import { FlashcardData, FlashcardModel } from '../data-models/flashcard-model';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { calculateScaleFactor } from '../utilities/calculate-scaler';

@Component({
  selector: 'ec-card-preview',
  standalone: true,
  imports: [MatIconModule, CommonModule, FlashcardComponent],
  templateUrl: './ec-card-preview.component.html',
  styleUrl: './ec-card-preview.component.scss'
})
export class EcCardPreviewComponent {
  @Input() flashcard: FlashcardModel = new FlashcardData("term", "definition (placeholder)");
  private readonly widthSF: number = 0.22;
  cardScaleFactor: number = calculateScaleFactor(this.widthSF,1, -46);

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.cardScaleFactor = calculateScaleFactor(this.widthSF, 1, -46);
  }
}
