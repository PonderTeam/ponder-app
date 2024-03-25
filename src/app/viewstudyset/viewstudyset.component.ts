import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StudybuttonmenuComponent } from '../studybuttonmenu/studybuttonmenu.component';
import { CustomTabsModule } from '../custom-tabs/custom-tabs.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ViewFcCardComponent } from '../view-fc-card/view-fc-card.component';
import { StudySetService } from '../services/study-set.service';
import { StudySetData } from '../data-models/studyset-model';
import { MatDialog } from '@angular/material/dialog';
import { SharePopUpComponent } from '../share-pop-up/share-pop-up.component';
import $ from "jquery";
import { FlashcardData } from '../data-models/flashcard-model';
import { getStudySetFromUrl } from '../utilities/route-helper';

@Component({
  selector: 'app-viewstudyset',
  standalone: true,
  imports: [
    MatCardModule,
    StudybuttonmenuComponent,
    CustomTabsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    ViewFcCardComponent
  ],
  templateUrl: './viewstudyset.component.html',
  styleUrl: './viewstudyset.component.scss'
})
export class ViewstudysetComponent {
  studySet: StudySetData = // prevents an error in browser console while loading
    new StudySetData("error", "error", "error", [new FlashcardData("error", "error")]);
  constructor(
    private studySetService: StudySetService,
    private route: ActivatedRoute,
    private dialogRef: MatDialog,
  ) {}

  ngOnInit() {
    this.loadStudySet();
  }

  loadStudySet() {
    getStudySetFromUrl(this.route, this.studySetService)
      .subscribe(sSet => this.studySet = sSet);
  }

  ngAfterViewChecked() {
    this.setScrollContainerHeight();
  }

  shareSet() {
    this.dialogRef.open(SharePopUpComponent, {maxWidth: '100vh', data: window.location.href});
  }

  setScrollContainerHeight() {
    var offset = $("app-navbar").outerHeight()!+ $("#title-header").outerHeight()!;
    $("#scroll-container").css({
        'height': (window.innerHeight) - offset
    });
  }
}
