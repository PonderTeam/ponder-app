import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStudySetComponent } from './view-study-set.component';

describe('ViewstudysetComponent', () => {
  let component: ViewStudySetComponent;
  let fixture: ComponentFixture<ViewStudySetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStudySetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewStudySetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
