import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccessData, UserData } from '../data-models/user-model';
import { UserInfoService } from '../services/user/user-info.service';
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
  userInfo: UserData = new UserData;
  recentSetList: AccessData[] = this.userInfo.getRecentSets();
  userSetList: AccessData[] = this.userInfo.getOwnedSets();
  ownedLength: Number = 0;
  recentLength: Number = 0;
  private readonly previewWidth = 256;
  private readonly padding = 12;
  private readonly margin = 64; // 32px left+right of screen
  private readonly slideWidth = this.previewWidth + (this.padding * 2);

  constructor(private userInfoService: UserInfoService) {};

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userInfoService.loadUser(sessionStorage.getItem('uid')!)
      .subscribe(user => [
        this.userInfo = user,
        this.recentSetList = this.userInfo.getRecentSets(),
        this.userSetList = this.userInfo.getOwnedSets(),
        this.ownedLength = this.userSetList?.length,
        this.recentLength = this.recentSetList?.length,
      ]);
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
    "swipeToSlide": true,
    "dots": true,
    "arrows": false,
    "infinite": false,
    "draggable": false,
    "responsive":[
      {
        "breakpoint" : this.calcBreakpoint(8),
        "settings": {
          "slidesToShow": 7
        }
      },
      {
        "breakpoint" : this.calcBreakpoint(7),
        "settings": {
          "slidesToShow": 6
        }
      },
      {
        "breakpoint" : this.calcBreakpoint(6),
        "settings": {
          "slidesToShow": 5
        }
      },
      {
        "breakpoint" :this.calcBreakpoint(5),
        "settings": {
          "slidesToShow": 4
        }
      },
      {
        "breakpoint" : this.calcBreakpoint(4),
        "settings": {
          "slidesToShow": 3
        }
      },
      {
        "breakpoint" : this.calcBreakpoint(3),
        "settings": {
          "slidesToShow": 2
        }
      },
      {
        "breakpoint" : this.calcBreakpoint(2),
        "settings": {
          "slidesToShow": 1
        }
      }
    ]
  };

  calcBreakpoint(numSlides: number) {
    return this.slideWidth * numSlides + this.margin - this.padding
  }

}
