import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';

import {MatExpansionModule} from '@angular/material/expansion'
@Component({
  selector: 'app-study-sequence',
  standalone: true,
  imports: [CommonModule, SequenceCardComponent, FlashcardComponent, ReturnRibbonComponent, MatExpansionModule],
  templateUrl: './study-sequence.component.html',
  styleUrl: './study-sequence.component.scss'
})
export class StudySequenceComponent {
  sequenceTitle: String = "Sequence Name";
  sequenceName: String[] = ['Sequence 1', 'Sequence 2', 'Sequence 3']
}
