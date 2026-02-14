import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {HeaderComponent} from "../../../admin/header.component/header.component";

export interface ProductImage {
  id: number;
  url: string;
  alt: string;
  type: 'photo' | 'plan' | '3d';
}

export interface ProductDetails {
  id: string;
  name: string;
  model: string;
  description: string;
  features: string[];
  surface: number;
  bedrooms: number;
  rooms: number;
  price: number;
  images: ProductImage[];
}

@Component({
  selector: 'app-offre-location.details',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HeaderComponent],
  templateUrl: './offre-location.details.component.html',
  styleUrl: './offre-location.details.component.css'
})
export class OffreLocationDetailsFrontOfficeComponent {
  product?: ProductDetails;
  loading = false;
  // Galerie d'images
  currentImageIndex = 0;
  showLightbox = false;
  lightboxImageIndex = 0;

  // Exemple de données (à remplacer par votre API)
  mockProduct: ProductDetails = {
    id: '1',
    name: 'SYMPHONIE 383',
    model: 'Modèle',
    description: 'Cette maison de plain-pied offre un espace de vie harmonieux avec une conception moderne et fonctionnelle. Les grandes baies vitrées inondent l\'intérieur de lumière naturelle, créant une atmosphère chaleureuse et accueillante.',
    features: [
      'Architecture moderne',
      'Grandes baies vitrées',
      'Jardin aménageable',
      'Garage double',
      'Cuisine ouverte',
      'Terrasse'
    ],
    surface: 100,
    bedrooms: 3,
    rooms: 5,
    price: 185000,
    images: [
      { id: 1, url: 'assets/unity.png', alt: 'Vue principale', type: 'photo' },
      { id: 2, url: 'assets/unity.png', alt: 'Vue arrière', type: 'photo' },
      { id: 3, url: 'assets/unity.png', alt: 'Vue latérale', type: 'photo' },
      { id: 4, url: 'assets/unity.png', alt: 'Plan', type: 'plan' },
      { id: 5, url: 'assets/unity.png', alt: 'Vue 3D', type: '3d' },
      { id: 6, url: 'assets/unity.png', alt: 'Intérieur', type: 'photo' },
      { id: 7, url: 'assets/unity.png', alt: 'Cuisine', type: 'photo' },
      { id: 8, url: 'assets/unity.png', alt: 'Chambre', type: 'photo' }
    ]
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.loadProduct(id);
  }

  loadProduct(id: string): void {
    // Simuler le chargement depuis API
    // Dans une vraie app : this.productService.getById(id).subscribe(...)
    this.product = this.mockProduct;
  }

  // Obtenir l'image principale actuelle
  getCurrentImage(): ProductImage | undefined {
    return this.product?.images[this.currentImageIndex];
  }

  // Changer l'image principale
  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  // Ouvrir la lightbox
  openLightbox(index: number): void {
    this.lightboxImageIndex = index;
    this.showLightbox = true;
    document.body.style.overflow = 'hidden'; // Bloquer le scroll
  }

  // Fermer la lightbox
  closeLightbox(): void {
    this.showLightbox = false;
    document.body.style.overflow = 'auto';
  }

  // Image suivante dans la lightbox
  nextImage(): void {
    if (this.product) {
      this.lightboxImageIndex = (this.lightboxImageIndex + 1) % this.product.images.length;
    }
  }

  // Image précédente dans la lightbox
  previousImage(): void {
    if (this.product) {
      this.lightboxImageIndex = this.lightboxImageIndex === 0
        ? this.product.images.length - 1
        : this.lightboxImageIndex - 1;
    }
  }

  // Gérer les touches clavier dans la lightbox
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

  // Scroll du carousel vers la gauche
  scrollCarousel(direction: 'left' | 'right'): void {
    const carousel = document.querySelector('.thumbnails-carousel');
    if (carousel) {
      const scrollAmount = 200;
      if (direction === 'left') {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }

  // Formater le prix
  formatPrice(price: number): string {
    return price.toLocaleString('fr-FR') + ' €';
  }

  // Acheter le produit
  buyProduct(): void {
    console.log('Achat du produit:', this.product?.name);
    // Logique d'achat
    alert('Fonctionnalité d\'achat à implémenter');
  }

  // Télécharger le PDF
  downloadPDF(): void {
    console.log('Téléchargement PDF');
    // Logique de téléchargement
    alert('Téléchargement du PDF');
  }

  // Comparer le produit
  compareProduct(): void {
    console.log('Comparer le produit');
    alert('Fonctionnalité de comparaison à implémenter');
  }

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }
}
