import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudySequenceComponent } from './study-sequence.component';

describe('StudySequenceComponent', () => {
  let component: StudySequenceComponent;
  let fixture: ComponentFixture<StudySequenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudySequenceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudySequenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
