import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-studybuttonmenu',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatMenuTrigger, MatIconModule, RouterLink],
  templateUrl: './studybuttonmenu.component.html',
  styleUrl: './studybuttonmenu.component.scss'
})
export class StudybuttonmenuComponent {

}
