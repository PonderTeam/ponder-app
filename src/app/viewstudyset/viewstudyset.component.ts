import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-viewstudyset',
  standalone: true,
  imports: [MatCardModule,MatTabsModule],
  templateUrl: './viewstudyset.component.html',
  styleUrl: './viewstudyset.component.scss'
})
export class ViewstudysetComponent {
  //TabsComponent!: TabsComponent;
}
