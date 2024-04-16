import { Component } from '@angular/core';
import { Observable, mergeMap, of} from 'rxjs';
import { StudySetService } from '../services/study-set/study-set.service';
import { ActivatedRoute } from '@angular/router';
import { getSearchQueryFromUrl } from '../utilities/route-helper';
import { SearchStudySetService } from '../services/search-study-set/search-study-set.service';
import { CommonModule } from '@angular/common';
import { SetPreviewCardComponent } from '../set-preview-card/set-preview-card.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, SetPreviewCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
  query?: Observable<string>;
  results?: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchStudySetService,
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    try {
      this.query = getSearchQueryFromUrl(this.route);
      this.results = this.query.pipe(mergeMap(q => this.searchService.searchForSets(q)));
    } catch (e) {
      // Mask errors and do nothing;
    }
  }
}
