import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header.component/header.component';
import { FooterComponent } from '../../footer.component/footer.component';

export interface ProductImage {
  url: string;
  nom: string;
}

export interface ProductDetails {
  id: number;
  nom: string;
  categorie: string;
  boutique: string;
  description: string;
  prix: number;
  prixOriginal?: number;
  quantite: number;
  images: ProductImage[];
  rating: number;
  reviews: number;
  badges?: string[];
}

@Component({
  selector: 'app-produit-details',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './produit-details.component.html',
  styleUrls: ['./produit-details.component.css']
})
export class ProduitDetailsComponent implements OnInit {
  product?: ProductDetails;
  loading = false;
  quantiteAchat = 1;

  // Galerie d'images
  currentImageIndex = 0;
  showLightbox = false;
  lightboxImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    if (id) {
      await this.loadProduct(id);
    }
  }

  async loadProduct(id: string): Promise<void> {
    this.loading = true;
    
    // Données mockées pour l'instant (à remplacer par un appel API)
    this.product = {
      id: parseInt(id),
      nom: 'Phantom Run Pro X',
      categorie: 'Chaussures de Sport',
      boutique: 'Aether Sports',
      description: 'Découvrez le summum de la performance avec la Phantom Run Pro X. Ces chaussures de sport de haute technologie sont conçues pour les athlètes exigeants qui recherchent confort, légèreté et durabilité. Dotées d\'une semelle en mousse réactive et d\'un système de ventilation avancé, elles vous accompagneront dans tous vos entraînements.',
      prix: 129.99,
      prixOriginal: 189.99,
      quantite: 15,
      rating: 4.8,
      reviews: 124,
      badges: ['Nouveau', 'Promo'],
      images: [
        {
          url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
          nom: 'Vue principale'
        },
        {
          url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
          nom: 'Vue latérale'
        },
        {
          url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800',
          nom: 'Vue arrière'
        },
        {
          url: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800',
          nom: 'Détails'
        }
      ]
    };

    this.loading = false;
  }

  goBack(): void {
    this.router.navigate(['/client/produit']);
  }

  // Obtenir l'image principale actuelle
  getCurrentImage(): ProductImage | undefined {
    return this.product?.images?.[this.currentImageIndex];
  }

  // Changer l'image principale
  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  // Navigation du carousel
  scrollCarousel(direction: 'left' | 'right'): void {
    const carousel = document.querySelector('.thumbnails-carousel');
    if (carousel) {
      const scrollAmount = 120;
      carousel.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  // Ouvrir la lightbox
  openLightbox(index: number): void {
    this.lightboxImageIndex = index;
    this.showLightbox = true;
    document.body.style.overflow = 'hidden';
  }

  // Fermer la lightbox
  closeLightbox(): void {
    this.showLightbox = false;
    document.body.style.overflow = 'auto';
  }

  // Image suivante dans la lightbox
  nextImage(): void {
    if (this.product && this.product.images) {
      this.lightboxImageIndex = (this.lightboxImageIndex + 1) % this.product.images.length;
    }
  }

  // Image précédente dans la lightbox
  previousImage(): void {
    if (this.product && this.product.images) {
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

  // Ajouter au panier
  ajouterAuPanier(): void {
    if (!this.product) return;

    if (this.quantiteAchat < 1) {
      alert('Veuillez sélectionner une quantité valide');
      return;
    }

    if (this.quantiteAchat > this.product.quantite) {
      alert(`Stock insuffisant. Quantité disponible: ${this.product.quantite}`);
      return;
    }

    // Récupérer le panier existant
    const panier = JSON.parse(localStorage.getItem('panier') || '[]');
    
    // Vérifier si le produit existe déjà dans le panier
    const existingIndex = panier.findIndex((item: any) => item.id === this.product!.id);
    
    if (existingIndex !== -1) {
      // Mettre à jour la quantité
      panier[existingIndex].quantite += this.quantiteAchat;
    } else {
      // Ajouter un nouveau produit
      panier.push({
        id: this.product.id,
        nom: this.product.nom,
        prix: this.product.prix,
        image: this.product.images[0].url,
        quantite: this.quantiteAchat,
        boutique: this.product.boutique
      });
    }

    // Sauvegarder le panier
    localStorage.setItem('panier', JSON.stringify(panier));
    
    alert('Produit ajouté au panier avec succès!');
  }

  // Calculer le pourcentage de réduction
  getDiscountPercentage(): number {
    if (!this.product || !this.product.prixOriginal) return 0;
    return Math.round(((this.product.prixOriginal - this.product.prix) / this.product.prixOriginal) * 100);
  }

  // Générer les étoiles pour le rating
  getStars(): string[] {
    if (!this.product) return [];
    const fullStars = Math.floor(this.product.rating);
    const hasHalfStar = this.product.rating % 1 >= 0.5;
    const stars: string[] = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('star');
    }
    if (hasHalfStar) {
      stars.push('star_half');
    }
    while (stars.length < 5) {
      stars.push('star_border');
    }
    
    return stars;
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
}

// Classe utilitaire pour affichage (à adapter selon vos besoins)
class UtilitaireUtil {
  static formatAmount(amount: number): string {
    return amount.toLocaleString('fr-FR', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  }
}
