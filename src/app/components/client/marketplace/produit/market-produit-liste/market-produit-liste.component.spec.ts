import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketProduitListeComponent } from './market-produit-liste.component';

describe('MarketProduitListeComponent', () => {
  let component: MarketProduitListeComponent;
  let fixture: ComponentFixture<MarketProduitListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketProduitListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarketProduitListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
