import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequenceSidebarComponent } from './sequence-sidebar.component';

describe('SequenceSidebarComponent', () => {
  let component: SequenceSidebarComponent;
  let fixture: ComponentFixture<SequenceSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SequenceSidebarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SequenceSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
