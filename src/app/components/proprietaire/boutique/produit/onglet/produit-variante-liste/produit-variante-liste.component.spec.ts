import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitVarianteListeComponent } from './produit-variante-liste.component';

describe('ProduitVarianteListeComponent', () => {
  let component: ProduitVarianteListeComponent;
  let fixture: ComponentFixture<ProduitVarianteListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitVarianteListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProduitVarianteListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
