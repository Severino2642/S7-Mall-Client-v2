import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreLocationDetailsComponent } from './offre-location.details.component';

describe('OffreLocationDetailsComponent', () => {
  let component: OffreLocationDetailsComponent;
  let fixture: ComponentFixture<OffreLocationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreLocationDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffreLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
