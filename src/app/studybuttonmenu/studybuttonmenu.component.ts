import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenu } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-studybuttonmenu',
  standalone: true,
  imports: [MatButtonModule, MatMenu, MatMenuTrigger, MatIconModule],
  templateUrl: './studybuttonmenu.component.html',
  styleUrl: './studybuttonmenu.component.scss'
})
export class StudybuttonmenuComponent {

}
