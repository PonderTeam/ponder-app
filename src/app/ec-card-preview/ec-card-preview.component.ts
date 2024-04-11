import { Component, Input } from '@angular/core';
import { FlashcardData, FlashcardModel } from '../data-models/flashcard-model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ec-card-preview',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './ec-card-preview.component.html',
  styleUrl: './ec-card-preview.component.scss'
})
export class EcCardPreviewComponent {
  @Input() flashcard: FlashcardModel = new FlashcardData("term", "definition (placeholder)");
}
