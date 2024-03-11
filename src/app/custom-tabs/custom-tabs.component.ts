// @Component({
//   selector: 'app-custom-tabs',
//   standalone: true,
//   imports: [],
//   templateUrl: './custom-tabs.component.html',
//   styleUrl: './custom-tabs.component.scss'
// })
// export class CustomTabsComponent {
// }

import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, Input, AfterContentChecked } from "@angular/core";
import { CustomTabsItemComponent } from "./custom-tabs-item.component";
import { Observable, Subscription } from "rxjs";
import { startWith, map, take, tap, delay } from "rxjs/operators";

@Component({
  selector: "app-tabs",
  templateUrl: './custom-tabs.component.html',
  styleUrl: './custom-tabs.component.scss'
})
export class CustomTabsComponent implements AfterContentInit, AfterContentChecked {
  @ContentChildren(CustomTabsItemComponent)
  tabs!: QueryList<CustomTabsItemComponent>;

  tabItems$!: Observable<CustomTabsItemComponent[]>;

  activeTab!: CustomTabsItemComponent;


  constructor() {}

  ngAfterContentInit(): void {
    this.tabItems$ = this.tabs.changes
      .pipe(startWith(""))
      .pipe(delay(0))
      .pipe(map(() => this.tabs.toArray()));
  }

  ngAfterContentChecked() {
    //choose the default tab
    // we need to wait for a next VM turn,
    // because Tab item content, will not be initialized yet
    if (!this.activeTab) {
      Promise.resolve().then(() => {
        this.activeTab = this.tabs.first;
      });
    }
  }

  selectTab(tabItem: CustomTabsItemComponent) {
    if (this.activeTab === tabItem) {
      return;
    }

    if (this.activeTab) {
      this.activeTab.isActive = false;

    }

    this.activeTab = tabItem;

    tabItem.isActive = true;
  }
}
