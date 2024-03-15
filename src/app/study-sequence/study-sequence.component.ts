import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-study-sequence',
  standalone: true,
  imports: [CommonModule, SequenceCardComponent, FlashcardComponent, ReturnRibbonComponent, MatButtonModule, MatMenuModule, MatMenuTrigger, MatIconModule],
  templateUrl: './study-sequence.component.html',
  styleUrl: './study-sequence.component.scss'
})
export class StudySequenceComponent {
  sequenceTitle: string = "Sequence 1";
  sequenceName: string[] = ['Sequence 1', 'Sequence 2', 'Sequence 3']

  changeName(newTitle: string){
    this.sequenceTitle = newTitle;
  }
}
