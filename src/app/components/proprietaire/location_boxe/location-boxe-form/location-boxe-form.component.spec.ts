import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBoxeFormComponent } from './location-boxe-form.component';

describe('LocationBoxeFormComponent', () => {
  let component: LocationBoxeFormComponent;
  let fixture: ComponentFixture<LocationBoxeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationBoxeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationBoxeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
