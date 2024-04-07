import { Component, HostListener } from '@angular/core';
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
import { SequenceData } from '../data-models/sequence-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-study-set',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    StudybuttonmenuComponent,
    CustomTabsModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    ViewFcCardComponent
  ],
  templateUrl: './view-study-set.component.html',
  styleUrl: './view-study-set.component.scss'
})
export class ViewStudySetComponent {
  studySet: StudySetData = // prevents an error in browser console while loading
    new StudySetData("error", "error", "error", [new FlashcardData("error", "error")]);
  activeSequence?: SequenceData;
  constructor(
    private studySetService: StudySetService,
    private route: ActivatedRoute,
    private dialogRef: MatDialog,
  ) {}

  ngOnInit() {
    this.loadStudySet();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.setScrollContainerHeight();
    this.setSeqListPosition();
  }

  loadStudySet() {
    getStudySetFromUrl(this.route, this.studySetService)
      .subscribe(sSet => [
        this.studySet = sSet,
        this.activeSequence = this.studySet.sequences[0]
      ]);
  }

  ngAfterViewChecked() {
    this.setScrollContainerHeight();
    this.setSeqListPosition();
  }

  shareSet() {
    this.dialogRef.open(SharePopUpComponent, {maxWidth: '100vh', data: window.location.href});
  }

  selectSequence(seq: SequenceData) {
    this.activeSequence = seq;
  }

  setScrollContainerHeight() {
    var titleOffset = $("app-navbar").outerHeight()! + $("#title-header").outerHeight()!;
    var outerHeight = window.innerHeight - titleOffset
    $("#outer-container").css({
        'height': outerHeight
    });

    var descOffset = $("#description").outerHeight()!;
    var innerHeight = $("#inner-container").outerHeight()!;
    $("#inner-container").css({
      'height': innerHeight > outerHeight + descOffset ? innerHeight : outerHeight + descOffset
    })
  }

  setSeqListPosition() {
    var tabOffset = $(".backdrop").outerHeight()!;
    var height = $("#outer-container").innerHeight()! - tabOffset;
    if (tabOffset) {
      $(".sequence-list").css({
        'top': tabOffset,
        'height': height
      })
    }
  }
}
