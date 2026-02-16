import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeLocationListeOngletComponent } from './demande-location.liste.onglet.component';

describe('DemandeLocationListeOngletComponent', () => {
  let component: DemandeLocationListeOngletComponent;
  let fixture: ComponentFixture<DemandeLocationListeOngletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeLocationListeOngletComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandeLocationListeOngletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
