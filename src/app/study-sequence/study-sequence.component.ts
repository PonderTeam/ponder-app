import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SequenceCardComponent } from '../sequence-card/sequence-card.component';
import { FlashcardComponent } from '../flashcard/flashcard.component';
import { ReturnRibbonComponent } from '../return-ribbon/return-ribbon.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { StudySetService } from '../services/study-set.service';
import { SequenceData } from '../data-models/sequence-model';

@Component({
  selector: 'app-study-sequence',
  standalone: true,
  imports: [CommonModule, SequenceCardComponent, FlashcardComponent, ReturnRibbonComponent, MatButtonModule, MatMenuModule, MatMenuTrigger, MatIconModule],
  templateUrl: './study-sequence.component.html',
  styleUrl: './study-sequence.component.scss'
})
export class StudySequenceComponent {
  constructor(
    private studySetService: StudySetService

  ) {}

  sequences?: SequenceData[];

  selectedSequence: SequenceData = new SequenceData("blah");

  ngOnInit(){
    this.getSequences("bbbb");
  }

  getSequences(setId: string){
    this.studySetService.getStudySet(setId)
    .subscribe(sSet => [
      this.sequences = sSet.sequences,
      this.selectedSequence = this.sequences[0],
      // this.isLoaded = true
    ])
  }

  changeSelectedSequence(sequence: SequenceData){
    this.selectedSequence = sequence;
  }

}
