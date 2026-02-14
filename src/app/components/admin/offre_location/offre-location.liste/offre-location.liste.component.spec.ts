import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreLocationListeComponent } from './offre-location.liste.component';

describe('OffreLocationListeComponent', () => {
  let component: OffreLocationListeComponent;
  let fixture: ComponentFixture<OffreLocationListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreLocationListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffreLocationListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
