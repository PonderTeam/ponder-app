import { Component, Input } from '@angular/core';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { FlashcardData } from '../data-models/flashcard-model';

@Component({
  selector: 'app-enlarged-flashcard',
  standalone: true,
  imports: [ FlashcardComponent],
  templateUrl: './enlarged-flashcard.component.html',
  styleUrl: './enlarged-flashcard.component.scss'
})
export class EnlargedFlashcardComponent {

}
