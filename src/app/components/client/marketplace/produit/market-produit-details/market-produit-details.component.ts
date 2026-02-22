import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../../../header.component/header.component";
import {ProduitCPLModel} from "../../../../../models/produit.model";
import {ProduitService} from "../../../../../services/produit.service/produit.service";
import {FileModel} from "../../../../../models/file.model";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";
import {FooterComponent} from "../../../footer.component/footer.component";
import {PanierModel} from "../../../../../models/panier.model";
import {StorageUtil} from "../../../../../utils/storage.util";
import {PanierService} from "../../../../../services/panier.service/panier.service";

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  type: 'main' | 'color' | 'detail' | 'video';
}

export interface ProductDetails {
  id: string;
  name: string;
  brand: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  inStock: boolean;
  stockCount?: number;
  seller: string;
  shipsFrom: string;
  delivery: {
    date: string;
    time: string;
  };
  limitedDeal?: boolean;
  boughtCount?: string;
  images: ProductImage[];
  colors: { name: string; color: string; available: boolean }[];
  size?: string;
  sizeOptions?: string[];
  specifications: { label: string; value: string }[];
  features: string[];
  description: string;
  questions: { question: string; answer?: string }[];
}

@Component({
  selector: 'app-market-produit-details',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './market-produit-details.component.html',
  styleUrl: './market-produit-details.component.css'
})
export class MarketProduitDetailsComponent {
  item?: ProduitCPLModel;
  loading = false;
  // Galerie d'images
  currentImageIndex = 0;
  showLightbox = false;
  quantity = 1;
  idClient = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produitService: ProduitService,
    private panierService: PanierService
  ) {}

  async ngOnInit(): Promise<void> {
    const auth = StorageUtil.getFromStorage<any>('auth');
    if (auth && auth.idUser) {
      this.idClient = auth.idUser;
    }
    const id = this.route.snapshot.params['id'];
    await this.loadProduct(id);
  }

  async loadProduct(id: string): Promise<void> {
    let res = await this.produitService.getCPLByIdForClient(id);
    if (res){
      this.item = res;
    }
  }

  // Galerie - Sélectionner une image
  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  // Image suivante
  nextImage(): void {
    if (this.item && this.item.autrePhoto) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.item.autrePhoto.length;
    }
  }

  // Image précédente
  previousImage(): void {
    if (this.item && this.item.autrePhoto) {
      this.currentImageIndex = this.currentImageIndex === 0
        ? this.item.autrePhoto.length - 1
        : this.currentImageIndex - 1;
    }
  }

  // Ouvrir lightbox
  openLightbox(index?: number): void {
    if (index !== undefined) {
      this.currentImageIndex = index;
    }
    this.showLightbox = true;
    document.body.style.overflow = 'hidden';
  }

  // Fermer lightbox
  closeLightbox(): void {
    this.showLightbox = false;
    document.body.style.overflow = 'auto';
  }

  // Image actuelle
  getCurrentImage(): FileModel | undefined {
    // @ts-ignore
    return this.item?.autrePhoto[this.currentImageIndex];
  }

  // Quantité
  incrementQuantity(): void {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  // Actions
  async addToCart(): Promise<void> {
    if (!this.item) return;

    this.loading = true;
    const panier : PanierModel = {
      idClient: this.idClient,
      idProduit: this.item._id,
      quantite: parseInt(this.quantity.toString())
    };
    await this.panierService.create(panier);
    let itemInCartCount = StorageUtil.getFromStorage<any>("cartItemsCount") || 0;
    itemInCartCount+=panier.quantite;
    StorageUtil.setToStorage("cartItemsCount", itemInCartCount);
    alert("Produit ajouté au panier !");
    this.loading = false;
  }

  buyNow(): void {
    console.log('Achat immédiat');
    alert('Redirection vers le paiement...');
  }

  addToList(): void {
    console.log('Ajout à la liste');
    alert('Ajouté à votre liste de souhaits !');
  }

  shareProduct(): void {
    console.log('Partager le produit');
    alert('Lien de partage copié !');
  }

  // Étoiles de notation
  getStarArray(): boolean[] {
    const rating = 5 || 0;
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }

  // Navigation clavier lightbox
  handleKeyboard(event: KeyboardEvent): void {
    if (this.showLightbox) {
      if (event.key === 'ArrowRight') {
        this.nextImage();
      } else if (event.key === 'ArrowLeft') {
        this.previousImage();
      } else if (event.key === 'Escape') {
        this.closeLightbox();
      }
    }
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;

  getQuantityOptions(): number[] {
    return Array.from({ length: this.item?.quantite || 0 }, (_, i) => i + 1);
  }

  goToMall(): void {
    if (!this.item || !this.item.centreCommercial) return;
    this.router.navigate(['/client/centre_commercial/details', this.item.centreCommercial?._id])
  }

  goToBoutique(idBoutique: string|undefined): void {
    if (idBoutique){
      this.router.navigate(['/client/boutique/details', idBoutique]);
    }
  }
}
