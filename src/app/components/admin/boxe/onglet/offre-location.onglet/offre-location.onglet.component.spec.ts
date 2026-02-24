import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffreLocationOngletComponent } from './offre-location.onglet.component';

describe('OffreLocationOngletComponent', () => {
  let component: OffreLocationOngletComponent;
  let fixture: ComponentFixture<OffreLocationOngletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OffreLocationOngletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OffreLocationOngletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
