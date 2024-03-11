import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-viewstudyset',
  standalone: true,
  imports: [MatCardModule, MatTabsModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './viewstudyset.component.html',
  styleUrl: './viewstudyset.component.scss'
})
export class ViewstudysetComponent {
}
