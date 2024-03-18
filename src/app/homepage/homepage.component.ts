import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule,RouterLink } from '@angular/router';
import { SetPreviewCardComponent } from '../set-preview-card/set-preview-card.component';


import { UserInfoFakeService } from '../services/user-info-fake.service';
import { AccessData, UserData } from '../data-models/user-model';
import { StudySetService } from '../services/study-set.service';
import { UserInfoService } from '../services/user-info.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    RouterLink,
    SetPreviewCardComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  // @Input() userData!:UserData;
  // @Input() userId: string = "there wasn't a userId passed to this"; // remove later

  userInfo: UserData = new UserData;
  recentSets: AccessData[] = this.userInfo.getRecentSets();

  constructor(private userInfoFakeService: UserInfoFakeService) {};

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userInfoFakeService.loadUser("Robbie")
      .subscribe(user => [
        this.userInfo = user,
      ]);
    this.recentSets = this.userInfo.getRecentSets().reverse()
  }


}
