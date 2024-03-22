import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule,RouterLink } from '@angular/router';
import { SetPreviewCardComponent } from '../set-preview-card/set-preview-card.component';

import { AccessData, UserData } from '../data-models/user-model';
import { UserInfoService } from '../services/user-info.service';
import { UserSetCardComponent } from '../user-set-card/user-set-card.component';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    RouterLink,
    SetPreviewCardComponent,
    UserSetCardComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss',
})
export class HomepageComponent {
  // @Input() userData!:UserData;
  // @Input() userId: string = "there wasn't a userId passed to this"; // remove later

  userInfo: UserData = new UserData;
  recentSetList: AccessData[] = this.userInfo.getRecentSets();
  userSetList: AccessData[] = this.userInfo.getOwnedSets();

  constructor(private userInfoService: UserInfoService) {};

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userInfoService.loadUser("Robbie")
      .subscribe(user => [
        this.userInfo = user,
      ]);
    this.recentSetList = this.userInfo.getRecentSets().reverse();
    this.userSetList = this.userInfo.getOwnedSets().reverse();
  }


}
