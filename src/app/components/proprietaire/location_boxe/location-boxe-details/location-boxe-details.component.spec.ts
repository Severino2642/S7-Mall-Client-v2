import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBoxeDetailsComponent } from './location-boxe-details.component';

describe('LocationBoxeDetailsComponent', () => {
  let component: LocationBoxeDetailsComponent;
  let fixture: ComponentFixture<LocationBoxeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationBoxeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationBoxeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
