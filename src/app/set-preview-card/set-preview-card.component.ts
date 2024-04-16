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
  @Input() setId?: string;
  studySet: StudySetData = new StudySetData();
  sequenceLength: Number = 0;

  constructor(private studySetService: StudySetService) {};

  ngOnInit() {
    this.getStudySet(this.setId!);
  }

  getStudySet(setId: string) {
    this.studySetService.getStudySet(setId)
      .subscribe(sSet => [
        this.studySet = sSet,
        this.sequenceLength = sSet.sequences.length
      ]);
  }

}
