import { Component } from '@angular/core';
import { Observable, catchError, mergeMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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
  query$?: Observable<string>;
  results$?: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchStudySetService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.query$ = getSearchQueryFromUrl(this.route).pipe(catchError(_ => {
      // navigate back to the homepage if the url is invalid
      this.router.navigate(["home-page"]);
      return '';
    }));
    this.results$ = this.query$.pipe(mergeMap(q => this.searchService.searchForSets(q)));
  }
}
