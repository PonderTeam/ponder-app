import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCreateStudySetComponent } from './edit-create-study-set.component';

describe('EditCreateStudySetComponent', () => {
  let component: EditCreateStudySetComponent;
  let fixture: ComponentFixture<EditCreateStudySetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCreateStudySetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCreateStudySetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
