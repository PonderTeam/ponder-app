import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyButtonMenuComponent } from './study-button-menu.component';

describe('StudyButtonMenuComponent', () => {
  let component: StudyButtonMenuComponent;
  let fixture: ComponentFixture<StudyButtonMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudyButtonMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyButtonMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
