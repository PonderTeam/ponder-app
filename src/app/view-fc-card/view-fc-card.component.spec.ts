import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFcCardComponent } from './view-fc-card.component';

describe('ViewFcCardComponent', () => {
  let component: ViewFcCardComponent;
  let fixture: ComponentFixture<ViewFcCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFcCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewFcCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
