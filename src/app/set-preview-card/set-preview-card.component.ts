import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { StudySetService } from '../services/study-set.service';
import { StudySetData } from '../data-models/studyset-model';
import { AccessData } from '../data-models/user-model';

@Component({
  selector: 'app-set-preview-card',
  standalone: true,
  imports: [CommonModule, MatCardModule,RouterLink],
  templateUrl: './set-preview-card.component.html',
  styleUrl: './set-preview-card.component.scss'
})
export class SetPreviewCardComponent {
  @Input() setId: string | undefined;
  @Input() userId: string = "there wasn't a userId passed to this"; // remove later
  studySet: StudySetData = new StudySetData(this.userId);

  @Input() AccessDataIn!: AccessData;

  constructor(private studySetService: StudySetService) {};

  ngOnInit() {
    this.setId = this.AccessDataIn.setId;
    this.getStudySet(this.setId);
  }

  getStudySet(setId: string) {
    this.studySetService.getStudySet(setId)
      .subscribe(sSet => [
        this.studySet = sSet,
      ]);
  }

}
