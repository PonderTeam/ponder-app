import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule,RouterLink } from '@angular/router';

import { UserSetCardComponent } from '../user-set-card/user-set-card.component';
import { UserInfoFakeService } from '../services/user-info-fake.service';
import { AccessData, UserData } from '../data-models/user-model';
import { UserInfoService } from '../services/user-info.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    RouterLink,
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

  constructor(private userInfoFakeService: UserInfoFakeService) {};

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userInfoFakeService.loadUser("Robbie")
      .subscribe(user => [
        this.userInfo = user,
      ]);
    this.recentSetList = this.userInfo.getRecentSets().reverse();
    this.userSetList = this.userInfo.getOwnedSets().reverse();
  }


}
