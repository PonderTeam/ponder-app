import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  ViewChild,
  TemplateRef,
  ContentChild,
} from "@angular/core";
import { CustomTabsLabelComponent } from "./custom-tabs-label.component";
import { CustomTabsBodyComponent } from "./custom-tabs-body.component";

@Component({
  selector: "app-tab-item",
  template: "<ng-content></ng-content>",
})
export class CustomTabsItemComponent implements OnInit {
  @Input()
  label!: string;

  @Input()
  isActive!: boolean;

  @ContentChild(CustomTabsBodyComponent)
  bodyComponent!: CustomTabsBodyComponent;

  @ContentChild(CustomTabsLabelComponent)
  labelComponent!: CustomTabsLabelComponent;

  constructor() {}

  ngOnInit(): void {}
}
