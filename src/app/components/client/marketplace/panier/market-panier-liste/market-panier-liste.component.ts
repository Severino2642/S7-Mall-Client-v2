import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {HeaderComponent} from "../../../header.component/header.component";
import {FooterComponent} from "../../../footer.component/footer.component";
import {PanierCPLModel, PanierModel} from "../../../../../models/panier.model";
import {PanierService} from "../../../../../services/panier.service/panier.service";
import {StorageUtil} from "../../../../../utils/storage.util";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";

export interface CartItem extends PanierCPLModel{
  selected: boolean;
}

@Component({
  selector: 'app-market-panier-liste',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './market-panier-liste.component.html',
  styleUrl: './market-panier-liste.component.css'
})
export class MarketPanierListeComponent {
  cartItems: CartItem[] = [];
  loading = false;
  selectAll = true;
  idClient = "";
  constructor(
    private router: Router,
    private panierService: PanierService
  ) {}

  async ngOnInit(): Promise<void> {
    const auth = StorageUtil.getFromStorage<any>('auth');
    if (auth && auth.idUser) {
      this.idClient = auth.idUser;
    }
    await this.loadItems();
    this.updateSelectAll();
  }

  async loadItems(): Promise<void> {
    const res = await this.panierService.getCPLByIdClient(this.idClient);
    if (res) {
      this.cartItems = res.map(item => ({ ...item, selected: true }));
    }
  }

  // Calcul du sous-total
  getSubtotal(): number {
    return this.cartItems
      .filter(item => item.selected)
      .reduce((total, item) => total + ((item.produit?.prix || 0) * (item.quantite || 0)), 0);
  }

  // Nombre d'articles sélectionnés
  getSelectedItemsCount(): number {
    return this.cartItems
      .filter(item => item.selected)
      .reduce((count, item) => count + (item.quantite||0), 0);
  }

  // Toggle sélection globale
  toggleSelectAll(): void {
    this.cartItems.forEach(item => item.selected = this.selectAll);
  }

  // Toggle sélection individuelle
  toggleItemSelection(item: CartItem): void {
    this.updateSelectAll();
  }

  // Mettre à jour selectAll
  updateSelectAll(): void {
    this.selectAll = this.cartItems.length > 0 &&
      this.cartItems.every(item => item.selected);
  }

  // Augmenter quantité
  async incrementQuantity(item: CartItem): Promise<void> {
    if (item.produit?.quantite && item.quantite && item.quantite < item.produit.quantite) {
      item.quantite++;
      this.loading = true;
      await this.panierService.update(item._id, { quantite: item.quantite });
      let itemInCartCount = StorageUtil.getFromStorage<any>("cartItemsCount") || 0;
      itemInCartCount++;
      StorageUtil.setToStorage("cartItemsCount", itemInCartCount);
      this.loading = false;
    }
  }

  // Diminuer quantité
  async decrementQuantity(item: CartItem): Promise<void> {
    this.loading = true;
    if (item.quantite && item.quantite > 1) {
      item.quantite--;
      await this.panierService.update(item._id, { quantite: item.quantite });
      let itemInCartCount = StorageUtil.getFromStorage<any>("cartItemsCount") || 0;
      itemInCartCount--;
      StorageUtil.setToStorage("cartItemsCount", itemInCartCount);
      this.loading = false;
      return;
    }
    if (item.quantite && item.quantite == 1) {
      if (confirm('Voulez-vous supprimer cet article du panier ?')) {
        let res = await this.panierService.delete(item._id);
        this.cartItems = this.cartItems.filter(i => i._id !== item._id);
        let itemInCartCount = StorageUtil.getFromStorage<any>("cartItemsCount") || 0;
        itemInCartCount--;
        StorageUtil.setToStorage("cartItemsCount", itemInCartCount);
      }
    }
    this.loading = false;
  }

  // Supprimer un article
  async deleteItem(item: CartItem): Promise<void> {
    this.loading = true;
    if (confirm('Voulez-vous supprimer cet article du panier ?')) {
      await this.panierService.delete(item._id);
      this.cartItems = this.cartItems.filter(i => i._id !== item._id);
      let itemInCartCount = StorageUtil.getFromStorage<any>("cartItemsCount") || 0;
      itemInCartCount = itemInCartCount - (item.quantite || 0);
      StorageUtil.setToStorage("cartItemsCount", itemInCartCount);
    }
    this.loading = false;
  }

  // Sauvegarder pour plus tard
  saveForLater(item: CartItem): void {
    console.log('Sauvegarder pour plus tard:', item);
  }

  // Comparer avec des articles similaires
  compareWithSimilar(item: CartItem): void {
    console.log('Comparer:', item);
    alert('Fonctionnalité de comparaison à implémenter');
  }

  // Partager
  shareItem(item: CartItem): void {
    console.log('Partager:', item);
    alert('Lien de partage copié !');
  }

  // Désélectionner tous les articles
  deselectAll(): void {
    this.cartItems.forEach(item => item.selected = false);
    this.selectAll = false;
  }

  // Procéder au paiement
  async proceedToCheckout(): Promise<void> {
    if (this.getSelectedItemsCount() === 0) {
      alert('Veuillez sélectionner au moins un article');
      return;
    }
    let listIdPanier = this.cartItems.filter(item => item.selected).map(item => item._id);
    let totalQuantity = this.cartItems.filter(item => item.selected).reduce((count, item) => count + (item.quantite||0), 0);
    const commande = await this.panierService.commander({"listIdPanier": listIdPanier});
    if (commande) {
      alert('Votre commande a été envoyer !');
      let itemInCartCount = StorageUtil.getFromStorage<any>("cartItemsCount") || 0;
      itemInCartCount = itemInCartCount - (totalQuantity || 0);
      StorageUtil.setToStorage("cartItemsCount", itemInCartCount);
      this.router.navigate(['/client/market/commande/details', commande._id]);
    }
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
}
