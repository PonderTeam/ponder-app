import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudybuttonmenuComponent } from './studybuttonmenu.component';

describe('StudybuttonmenuComponent', () => {
  let component: StudybuttonmenuComponent;
  let fixture: ComponentFixture<StudybuttonmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudybuttonmenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StudybuttonmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
