import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBoxeListeComponent } from './location-boxe-liste.component';

describe('LocationBoxeListeComponent', () => {
  let component: LocationBoxeListeComponent;
  let fixture: ComponentFixture<LocationBoxeListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationBoxeListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationBoxeListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
