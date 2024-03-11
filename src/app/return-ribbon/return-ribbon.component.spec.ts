import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRibbonComponent } from './return-ribbon.component';

describe('ReturnRibbonComponent', () => {
  let component: ReturnRibbonComponent;
  let fixture: ComponentFixture<ReturnRibbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReturnRibbonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReturnRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
