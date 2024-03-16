import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcCardPreviewComponent } from './ec-card-preview.component';

describe('EcCardPreviewComponent', () => {
  let component: EcCardPreviewComponent;
  let fixture: ComponentFixture<EcCardPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcCardPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EcCardPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
