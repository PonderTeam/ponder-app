import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CustomTabsModule } from '../custom-tabs/custom-tabs.module';
import { FlashcardEditorComponent } from '../flashcard-editor/flashcard-editor.component';
import { SequenceEditorComponent } from '../sequence-editor/sequence-editor.component';
import { StudySetService } from '../services/study-set.service';
import { StudySetData } from '../data-models/studyset-model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SavePopUpComponent } from '../save-pop-up/save-pop-up.component';
import { FlashcardData } from '../data-models/flashcard-model';
import { SequenceData } from '../data-models/sequence-model';
import { getStudySetFromUrl } from '../utilities/route-helper';
import { RouteParamNotFound } from '../errors/route-param-error';
import { UserInfoService } from '../services/user-info.service';

@Component({
  selector: 'app-edit-create-study-set',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    CustomTabsModule,
    RouterLink,
    FlashcardEditorComponent,
    SequenceEditorComponent,
    MatDialogModule
  ],
  templateUrl: './edit-create-study-set.component.html',
  styleUrl: './edit-create-study-set.component.scss'
})
export class EditCreateStudySetComponent {
  @Input() userId: string = sessionStorage.getItem("uid")!;
  studySet: StudySetData = new StudySetData(this.userId);
  isLoaded: boolean = false;
  constructor(
    private studySetService: StudySetService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogRef: MatDialog,
    private userInfoService: UserInfoService,
  ) {
    // needed to reload the component if user goes from "edit" to "create"
    // we should implement our own strategy for router reuse in another task
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  };

  ngOnInit() {
    this.loadStudySet();
  }

  loadStudySet() {
    getStudySetFromUrl(this.route, this.studySetService)
      .subscribe({
        next: (sSet) => [
          this.studySet = sSet,
          this.isLoaded = true
        ],
        error: (e) => {if (e instanceof RouteParamNotFound) {
          this.studySet.addCard();
          this.isLoaded = true;
        } else {
          console.log(e);
        }}
      });
  }

  saveSet() {
    if (this.studySet.isValid()) {
      this.studySetService.saveStudySet(this.studySet).subscribe(newId => [
        this.router.navigate(["view-set"], { queryParams:{ sid: newId }})
      ]);

    } else {
      this.dialogRef.open(SavePopUpComponent);
    }
  }

  addCard() {
    this.studySet.addCard();
  }

  addSequence() {
    this.studySet.addSequence("unnamed sequence");
  }

  removeCard(flashcard: FlashcardData) {
    this.studySet.deleteCard(flashcard);
  }

  removeSequence(seq: SequenceData) {
    this.studySet.deleteSequence(seq);
  }
}
