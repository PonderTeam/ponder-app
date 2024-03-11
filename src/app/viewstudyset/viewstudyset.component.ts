import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { StudybuttonmenuComponent } from '../studybuttonmenu/studybuttonmenu.component';
import { CustomTabsModule } from '../custom-tabs/custom-tabs.module';

@Component({
  selector: 'app-viewstudyset',
  standalone: true,
  imports: [MatCardModule,MatTabsModule,StudybuttonmenuComponent, CustomTabsModule],
  templateUrl: './viewstudyset.component.html',
  styleUrl: './viewstudyset.component.scss'
})
export class ViewstudysetComponent {
}
