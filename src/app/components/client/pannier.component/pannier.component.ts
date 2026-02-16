import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header.component/header.component';
import { FooterComponent } from '../footer.component/footer.component';

export interface CartItem {
  id: number;
  nom: string;
  prix: number;
  image: string;
  quantite: number;
  boutique: string;
  details?: string;
}

export interface BoutiqueGroup {
  boutique: string;
  etage?: string;
  items: CartItem[];
}

@Component({
  selector: 'app-pannier',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './pannier.component.html',
  styleUrls: ['./pannier.component.css']
})
export class PannierComponent implements OnInit {
  cartItems: CartItem[] = [];
  boutiqueGroups: BoutiqueGroup[] = [];
  
  // Pricing
  subtotal: number = 0;
  shippingCost: number = 0;
  taxRate: number = 0.07; // 7% tax
  taxAmount: number = 0;
  totalAmount: number = 0;
  
  promoCode: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
    this.groupByBoutique();
    this.calculateTotals();
  }

  // Charger le panier depuis localStorage
  loadCart(): void {
    const cart = localStorage.getItem('panier');
    if (cart) {
      this.cartItems = JSON.parse(cart);
    }
  }

  // Grouper les produits par boutique
  groupByBoutique(): void {
    const groups: { [key: string]: CartItem[] } = {};
    
    this.cartItems.forEach(item => {
      if (!groups[item.boutique]) {
        groups[item.boutique] = [];
      }
      groups[item.boutique].push(item);
    });

    this.boutiqueGroups = Object.keys(groups).map(boutique => ({
      boutique,
      etage: this.getEtageForBoutique(boutique),
      items: groups[boutique]
    }));
  }

  // Obtenir l'étage de la boutique (à adapter selon vos données)
  getEtageForBoutique(boutique: string): string {
    const etages: { [key: string]: string } = {
      'Aether Sports': '2e Etages',
      'Sole Avenue': 'Ge Etages',
      'Urban Threads': '2e Etages',
      'Tech Haven': '1e Etages'
    };
    return etages[boutique] || '1e Etages';
  }

  // Calculer les totaux
  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.prix * item.quantite), 0);
    
    // Livraison gratuite si > 500
    this.shippingCost = this.subtotal > 500 ? 0 : 15;
    
    this.taxAmount = this.subtotal * this.taxRate;
    this.totalAmount = this.subtotal + this.shippingCost + this.taxAmount;
  }

  // Sauvegarder le panier
  saveCart(): void {
    localStorage.setItem('panier', JSON.stringify(this.cartItems));
    this.groupByBoutique();
    this.calculateTotals();
  }

  // Mettre à jour la quantité
  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantite + change;
    
    if (newQuantity < 1) {
      this.removeItem(item);
      return;
    }
    
    // Mise à jour dans le tableau principal
    const index = this.cartItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantite = newQuantity;
      item.quantite = newQuantity;
      this.saveCart();
    }
  }

  // Supprimer un produit
  removeItem(item: CartItem): void {
    const index = this.cartItems.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCart();
    }
  }

  // Continuer les achats
  continueShopping(): void {
    this.router.navigate(['/client/produit']);
  }

  // Procéder au paiement
  proceedToCheckout(): void {
    if (this.cartItems.length === 0) {
      alert('Votre panier est vide');
      return;
    }
    
    alert('Fonctionnalité de paiement à implémenter');
    // TODO: Navigate to checkout page
    // this.router.navigate(['/client/checkout']);
  }

  // Obtenir le nombre total d'articles
  getTotalItems(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantite, 0);
  }

  // Formater le montant
  formatAmount(amount: number): string {
    return amount.toFixed(2);
  }
}
