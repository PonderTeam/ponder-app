import { Component, Input } from '@angular/core';
import { FlashcardData } from '../data-models/flashcard-model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-view-fc-card',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './view-fc-card.component.html',
  styleUrl: './view-fc-card.component.scss'
})
export class ViewFcCardComponent {
  @Input() flashcard: FlashcardData = new FlashcardData("error", "error");
}
