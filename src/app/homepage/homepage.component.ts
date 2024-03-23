import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccessData, UserData } from '../data-models/user-model';
import { UserInfoService } from '../services/user-info.service';
import { SetPreviewCardComponent } from '../set-preview-card/set-preview-card.component';
import { UserSetCardComponent } from '../user-set-card/user-set-card.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
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
    this.recentSetList = this.userInfo.getRecentSets();
    this.userSetList = this.userInfo.getOwnedSets();
  }

}
