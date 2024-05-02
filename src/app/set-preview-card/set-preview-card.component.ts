import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StudySetService } from '../services/study-set/study-set.service';
import { StudySetData } from '../data-models/studyset-model';
import { AccessData } from '../data-models/user-model';

@Component({
  selector: 'app-set-preview-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './set-preview-card.component.html',
  styleUrl: './set-preview-card.component.scss'
})
export class SetPreviewCardComponent {
  @Input() setId!: string;
  studySet: StudySetData = new StudySetData();
  sequenceLength: number = 0;
  sequenceLabel: String = "Sequence";


  constructor(private studySetService: StudySetService) {};

  ngOnInit() {
    this.getStudySet(this.setId!);
    this.labelPlural(this.sequenceLength);
  }

  getStudySet(setId: string) {
    this.studySetService.getStudySet(setId)
      .subscribe(sSet => [
        this.studySet = sSet,
        this.sequenceLength = sSet.sequences.length
      ]);
  }

  labelPlural(sequenceLength: number){
    if (sequenceLength > 1) {
      this.sequenceLabel = "Sequences"
    }
    else {
      this.sequenceLabel = "Sequence"
    }
  }
}
