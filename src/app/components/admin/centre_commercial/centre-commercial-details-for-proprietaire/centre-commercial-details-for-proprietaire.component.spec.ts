import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreCommercialDetailsForProprietaireComponent } from './centre-commercial-details-for-proprietaire.component';

describe('CentreCommercialDetailsForProprietaireComponent', () => {
  let component: CentreCommercialDetailsForProprietaireComponent;
  let fixture: ComponentFixture<CentreCommercialDetailsForProprietaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentreCommercialDetailsForProprietaireComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentreCommercialDetailsForProprietaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
