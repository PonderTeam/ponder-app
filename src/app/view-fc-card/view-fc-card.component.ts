import { Component, Input } from '@angular/core';
import { FlashcardData } from '../data-models/flashcard-model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ImageService } from '../services/image/image.service';

@Component({
  selector: 'app-view-fc-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './view-fc-card.component.html',
  styleUrl: './view-fc-card.component.scss'
})
export class ViewFcCardComponent {
  @Input() flashcard: FlashcardData = new FlashcardData("error", "error");

  constructor(protected imageService: ImageService) {}
}
