import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccessData, UserData } from '../data-models/user-model';
import { UserInfoService } from '../services/user-info.service';
import { SetPreviewCardComponent } from '../set-preview-card/set-preview-card.component';
import { UserSetCardComponent } from '../user-set-card/user-set-card.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SlickCarouselModule, SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    SetPreviewCardComponent,
    SlickCarouselModule,
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

  @ViewChild('slickModal') slickModal: SlickCarouselComponent = new SlickCarouselComponent;
  recentCarouselNext() {
    this.slickModal.slickNext();
  }
  recentCarouselPrev() {
    this.slickModal.slickPrev();
  }


  slideConfig = {
    "slidesToShow": 8,
    "slidesToScroll": 1,
    "dots": true,
    "arrows": true,
    "infinite": false,
    "responsive":[
      {
        "breakpoint" : 255*8 + 64,
        "settings": {
          "slidesToShow": 7
        }
      },
      {
        "breakpoint" : 255*7 + 64,
        "settings": {
          "slidesToShow": 6
        }
      },
      {
        "breakpoint" : 255*6 + 64,
        "settings": {
          "slidesToShow": 5
        }
      },
      {
        "breakpoint" : 255*5 + 64,
        "settings": {
          "slidesToShow": 4
        }
      },
      {
        "breakpoint" : 255*4 + 64,
        "settings": {
          "slidesToShow": 3
        }
      },
      {
        "breakpoint" : 255*3 + 64,
        "settings": {
          "slidesToShow": 2
        }
      },
      {
        "breakpoint" : 255*2 + 64,
        "settings": {
          "slidesToShow": 1
        }
      }
    ]
  };

}
