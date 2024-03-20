import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StudybuttonmenuComponent } from '../studybuttonmenu/studybuttonmenu.component';
import { CustomTabsModule } from '../custom-tabs/custom-tabs.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ViewFcCardComponent } from '../view-fc-card/view-fc-card.component';
import { StudySetService } from '../services/study-set.service';
import { StudySetData } from '../data-models/studyset-model';
import { MatDialog } from '@angular/material/dialog';
import { SharePopUpComponent } from '../share-pop-up/share-pop-up.component';

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
  studySet?: StudySetData;
  constructor(
    private studySetService: StudySetService,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const sid = params.get("sid");
      if (sid) {
        this.getStudySet(sid);
      } else {
        // we will want to make a 404 not found page
        console.log("Set does not exist so retrieved default");
        this.getStudySet("aaaa");
      }
    })
  };

  getStudySet(setId: string) {
    this.studySetService.getStudySet(setId)
      .subscribe(sSet => [
        this.studySet = sSet,
      ]);
  }

  shareSet() {
    this.dialogRef.open(SharePopUpComponent, {maxWidth: '100vh', data: window.location.href});
  }
}
