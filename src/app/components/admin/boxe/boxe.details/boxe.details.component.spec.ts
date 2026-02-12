import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxeDetailsComponent } from './boxe.details.component';

describe('BoxeDetailsComponent', () => {
  let component: BoxeDetailsComponent;
  let fixture: ComponentFixture<BoxeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
