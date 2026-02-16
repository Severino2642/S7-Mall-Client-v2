import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PannierComponent } from './pannier.component';

describe('PannierComponent', () => {
  let component: PannierComponent;
  let fixture: ComponentFixture<PannierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PannierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PannierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cart from localStorage', () => {
    const mockCart = [
      { id: 1, nom: 'Test Product', prix: 100, quantite: 2, boutique: 'Test Shop', image: 'test.jpg' }
    ];
    localStorage.setItem('panier', JSON.stringify(mockCart));
    
    component.ngOnInit();
    
    expect(component.cartItems.length).toBe(1);
    expect(component.cartItems[0].nom).toBe('Test Product');
  });

  it('should calculate totals correctly', () => {
    component.cartItems = [
      { id: 1, nom: 'Product 1', prix: 100, quantite: 2, boutique: 'Shop 1', image: 'test1.jpg' },
      { id: 2, nom: 'Product 2', prix: 50, quantite: 1, boutique: 'Shop 2', image: 'test2.jpg' }
    ];
    
    component.calculateTotals();
    
    expect(component.subtotal).toBe(250);
    expect(component.taxAmount).toBeCloseTo(17.5, 1);
  });

  it('should update quantity', () => {
    const item: any = { id: 1, nom: 'Test', prix: 100, quantite: 2, boutique: 'Shop', image: 'test.jpg' };
    component.cartItems = [item];
    
    component.updateQuantity(item, 1);
    
    expect(item.quantite).toBe(3);
  });

  it('should remove item', () => {
    const item: any = { id: 1, nom: 'Test', prix: 100, quantite: 2, boutique: 'Shop', image: 'test.jpg' };
    component.cartItems = [item];
    
    component.removeItem(item);
    
    expect(component.cartItems.length).toBe(0);
  });

  it('should group products by boutique', () => {
    component.cartItems = [
      { id: 1, nom: 'Product 1', prix: 100, quantite: 2, boutique: 'Shop A', image: 'test1.jpg' },
      { id: 2, nom: 'Product 2', prix: 50, quantite: 1, boutique: 'Shop B', image: 'test2.jpg' },
      { id: 3, nom: 'Product 3', prix: 75, quantite: 1, boutique: 'Shop A', image: 'test3.jpg' }
    ];
    
    component.groupByBoutique();
    
    expect(component.boutiqueGroups.length).toBe(2);
    expect(component.boutiqueGroups[0].items.length).toBe(2);
  });
});
