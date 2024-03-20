import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPoolComponent } from './card-pool.component';

describe('CardPoolComponent', () => {
  let component: CardPoolComponent;
  let fixture: ComponentFixture<CardPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPoolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
