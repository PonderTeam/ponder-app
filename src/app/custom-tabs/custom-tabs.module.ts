import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomTabsComponent } from "./custom-tabs.component";
import { CustomTabsItemComponent } from "./custom-tabs-item.component";
import { CustomTabsLabelComponent } from "./custom-tabs-label.component";
import { CustomTabsBodyComponent } from "./custom-tabs-body.component";

@NgModule({
  declarations: [
    CustomTabsComponent,
    CustomTabsItemComponent,
    CustomTabsLabelComponent,
    CustomTabsBodyComponent,
  ],
  imports: [CommonModule],
  exports: [
    CustomTabsComponent,
    CustomTabsItemComponent,
    CustomTabsBodyComponent,
    CustomTabsLabelComponent,
  ],
})
export class CustomTabsModule {}
