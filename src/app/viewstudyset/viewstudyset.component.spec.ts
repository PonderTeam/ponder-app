import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstudysetComponent } from './viewstudyset.component';

describe('ViewstudysetComponent', () => {
  let component: ViewstudysetComponent;
  let fixture: ComponentFixture<ViewstudysetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewstudysetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewstudysetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
