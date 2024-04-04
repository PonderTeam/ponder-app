import {
  Component,
  Input,
  ContentChild,
} from "@angular/core";
import { CustomTabsLabelComponent } from "./custom-tabs-label.component";
import { CustomTabsBodyComponent } from "./custom-tabs-body.component";

@Component({
  selector: "app-tab-item",
  template: "<ng-content></ng-content>",
})
export class CustomTabsItemComponent {
  @Input()
  label!: string;

  @Input()
  isActive!: boolean;

  @Input()
  isEnabled: boolean = true;

  @ContentChild(CustomTabsBodyComponent)
  bodyComponent!: CustomTabsBodyComponent;

  @ContentChild(CustomTabsLabelComponent)
  labelComponent!: CustomTabsLabelComponent;
}
