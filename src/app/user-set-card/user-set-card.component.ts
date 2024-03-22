import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StudySetService } from '../services/study-set.service';
import { StudySetData } from '../data-models/studyset-model';
import { AccessData } from '../data-models/user-model';

@Component({
  selector: 'app-user-set-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './user-set-card.component.html',
  styleUrl: './user-set-card.component.scss'
})
export class UserSetCardComponent {
  @Input() setId: string | undefined;
  @Input() userId: string = "there wasn't a userId passed to this"; // remove later
  studySet: StudySetData = new StudySetData(this.userId);

  @Input() AccessDataIn!: AccessData;
  viewDate: string = "no date";

  constructor(private studySetService: StudySetService) {};

  ngOnInit() {
    this.setId = this.AccessDataIn.setId;
    this.getStudySet(this.setId);
    this.viewDate = this.AccessDataIn.viewed.toLocaleDateString(undefined, {
        day: 'numeric',
        month: 'numeric',
        year: '2-digit'
    });
  }

  getStudySet(setId: string) {
    this.studySetService.getStudySet(setId)
      .subscribe(sSet => [
        this.studySet = sSet,
      ]);
  }
}
