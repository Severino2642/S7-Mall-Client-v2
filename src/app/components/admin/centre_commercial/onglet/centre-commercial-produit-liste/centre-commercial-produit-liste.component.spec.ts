import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreCommercialProduitListeComponent } from './centre-commercial-produit-liste.component';

describe('CentreCommercialProduitListeComponent', () => {
  let component: CentreCommercialProduitListeComponent;
  let fixture: ComponentFixture<CentreCommercialProduitListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentreCommercialProduitListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentreCommercialProduitListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
