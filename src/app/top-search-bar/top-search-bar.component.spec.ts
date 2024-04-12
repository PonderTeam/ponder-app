import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopSearchBarComponent } from './top-search-bar.component';

describe('TopSearchBarComponent', () => {
  let component: TopSearchBarComponent;
  let fixture: ComponentFixture<TopSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopSearchBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
