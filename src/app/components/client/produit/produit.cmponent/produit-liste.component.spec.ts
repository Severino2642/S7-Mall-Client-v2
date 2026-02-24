import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitListeComponent } from './produit-liste.component';

describe('ProduitListeComponent', () => {
  let component: ProduitListeComponent;
  let fixture: ComponentFixture<ProduitListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProduitListeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProduitListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter products by search term', () => {
    component.searchTerm = 'Phantom';
    component.applyFilters();
    expect(component.filteredProducts.length).toBeGreaterThan(0);
    expect(component.filteredProducts[0].nom).toContain('Phantom');
  });

  it('should apply category filters', () => {
    component.filters.selectedCategory = 'Electronics';
    component.applyFilters();
    expect(component.filteredProducts.length).toBeGreaterThan(0);
    component.filteredProducts.forEach(product => {
      expect(product.categorie).toBe('Electronics');
    });
  });

  it('should apply boutique filters', () => {
    component.filters.selectedBoutique = 'Aether Sports';
    component.applyFilters();
    expect(component.filteredProducts.length).toBeGreaterThan(0);
    component.filteredProducts.forEach(product => {
      expect(product.boutique).toBe('Aether Sports');
    });
  });

  it('should apply price range filters', () => {
    component.filters.priceMin = 100;
    component.filters.priceMax = 200;
    component.applyFilters();
    component.filteredProducts.forEach(product => {
      expect(product.prix).toBeGreaterThanOrEqual(100);
      expect(product.prix).toBeLessThanOrEqual(200);
    });
  });

  it('should sort products by price', () => {
    component.sortBy = 'price-low';
    expect(component.filteredProducts[0].prix).toBeLessThanOrEqual(
      component.filteredProducts[component.filteredProducts.length - 1].prix
    );
  });
});
