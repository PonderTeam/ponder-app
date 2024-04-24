import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-return-ribbon',
  standalone: true,
  imports: [RouterModule, RouterLink, MatIconModule],
  templateUrl: './return-ribbon.component.html',
  styleUrl: './return-ribbon.component.scss'
})
export class ReturnRibbonComponent {
  @Input() setId?: string;
}
