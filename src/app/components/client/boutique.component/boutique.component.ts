import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../header.component/header.component';
import { FooterComponent } from '../footer.component/footer.component';

export interface Boutique {
  id: number;
  nom: string;
  description: string;
  categorie: string;
  etage: string;
  unite: string;
  heureOuverture: string;
  heureFermeture: string;
  image: string;
  icon: string;
}

export interface CentreCommercial {
  id: number;
  nom: string;
  adresse: string;
  ville: string;
  heureOuverture: string;
  heureFermeture: string;
  image: string;
}

@Component({
  selector: 'app-boutique',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './boutique.component.html',
  styleUrls: ['./boutique.component.css']
})
export class BoutiqueComponent implements OnInit {
  // Centre commercial sélectionné
  centre: CentreCommercial = {
    id: 1,
    nom: 'OLYMPIA Mall',
    adresse: '123 Avenue de l\'Indépendance',
    ville: 'Antananarivo',
    heureOuverture: '09:00',
    heureFermeture: '21:00',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800'
  };

  // Liste des boutiques
  boutiques: Boutique[] = [
    {
      id: 1,
      nom: 'Urban Styles',
      description: 'Vêtements modernes et minimalistes pour hommes et femmes. Matériaux durables et collections saisonnières.',
      categorie: 'Mode & Vêtements',
      etage: 'Niveau 2',
      unite: '245',
      heureOuverture: '10:00',
      heureFermeture: '20:00',
      image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800',
      icon: 'checkroom'
    },
    {
      id: 2,
      nom: 'TechHub',
      description: 'Smartphones, ordinateurs et gadgets connectés dernière génération. Services de réparation sur place.',
      categorie: 'Électronique',
      etage: 'Niveau 3',
      unite: '312',
      heureOuverture: '09:30',
      heureFermeture: '20:30',
      image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800',
      icon: 'devices'
    },
    {
      id: 3,
      nom: 'Gourmet Garden',
      description: 'Cuisine fusion artisanale avec des ingrédients bio frais et boissons artisanales.',
      categorie: 'Restaurant',
      etage: 'Niveau 2',
      unite: '201',
      heureOuverture: '11:00',
      heureFermeture: '21:00',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      icon: 'restaurant'
    },
    {
      id: 4,
      nom: 'Pure Glow',
      description: 'Soins de la peau premium, maquillage et traitements beauté bio pour tous types de peau.',
      categorie: 'Beauté & Bien-être',
      etage: 'Rez-de-chaussée',
      unite: '044',
      heureOuverture: '10:00',
      heureFermeture: '19:00',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800',
      icon: 'spa'
    },
    {
      id: 5,
      nom: 'KineCinema',
      description: 'Expérience cinéma 4DX de luxe avec sièges inclinables et son surround premium.',
      categorie: 'Divertissement',
      etage: 'Niveau 3',
      unite: '350',
      heureOuverture: '12:00',
      heureFermeture: '23:00',
      image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800',
      icon: 'movie'
    },
    {
      id: 6,
      nom: 'ActivePulse',
      description: 'Équipements de gym de pointe, coaching personnel et cours collectifs de fitness.',
      categorie: 'Sport & Fitness',
      etage: 'Niveau 1',
      unite: '115',
      heureOuverture: '06:00',
      heureFermeture: '22:00',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      icon: 'fitness_center'
    },
    {
      id: 7,
      nom: 'Modern Living',
      description: 'Meubles contemporains et accessoires de décoration pour sublimer votre espace avec style et confort.',
      categorie: 'Maison & Décoration',
      etage: 'Sous-sol',
      unite: 'LG-05',
      heureOuverture: '10:00',
      heureFermeture: '19:00',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      icon: 'home'
    },
    {
      id: 8,
      nom: 'Trend Boutique',
      description: 'Pièces de créateurs sélectionnées et articles de mode édition limitée pour les amateurs de tendances.',
      categorie: 'Mode',
      etage: 'Niveau 1',
      unite: '142',
      heureOuverture: '10:30',
      heureFermeture: '20:30',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
      icon: 'shopping_bag'
    },
    {
      id: 9,
      nom: 'Librairie Horizon',
      description: 'Large sélection de livres, magazines et papeterie pour tous les âges et tous les goûts.',
      categorie: 'Culture & Loisirs',
      etage: 'Niveau 1',
      unite: '128',
      heureOuverture: '09:00',
      heureFermeture: '20:00',
      image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
      icon: 'menu_book'
    },
    {
      id: 10,
      nom: 'Bijouterie Étoile',
      description: 'Bijoux artisanaux et montres de luxe. Créations sur mesure et réparations.',
      categorie: 'Bijouterie',
      etage: 'Rez-de-chaussée',
      unite: '032',
      heureOuverture: '10:00',
      heureFermeture: '19:30',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      icon: 'diamond'
    },
    {
      id: 11,
      nom: 'Kids Paradise',
      description: 'Jouets éducatifs, jeux et vêtements pour enfants de 0 à 12 ans.',
      categorie: 'Enfants',
      etage: 'Niveau 2',
      unite: '223',
      heureOuverture: '10:00',
      heureFermeture: '20:00',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800',
      icon: 'toys'
    },
    {
      id: 12,
      nom: 'Café Arôme',
      description: 'Café artisanal, pâtisseries maison et snacks légers dans une ambiance chaleureuse.',
      categorie: 'Café & Restauration',
      etage: 'Rez-de-chaussée',
      unite: '018',
      heureOuverture: '08:00',
      heureFermeture: '20:00',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      icon: 'local_cafe'
    }
  ];

  filteredBoutiques: Boutique[] = [];
  searchTerm: string = '';
  selectedCategorie: string = 'Toutes';
  selectedEtage: string = 'Tous les niveaux';
  heureDebutFilter: string = '';
  heureFinFilter: string = '';

  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;

  // Catégories uniques
  categories: string[] = [];
  etages: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du centre depuis les paramètres de route
    const centreId = this.route.snapshot.queryParamMap.get('centre');
    if (centreId) {
      // En production, charger les données du centre depuis l'API
      console.log('Centre ID:', centreId);
    }

    this.filteredBoutiques = [...this.boutiques];
    this.extractCategories();
    this.extractEtages();
    this.calculateTotalPages();
  }

  // Extraire les catégories uniques
  extractCategories(): void {
    const categoriesSet = new Set(this.boutiques.map(b => b.categorie));
    this.categories = ['Toutes', ...Array.from(categoriesSet)];
  }

  // Extraire les étages uniques
  extractEtages(): void {
    const etagesSet = new Set(this.boutiques.map(b => b.etage));
    this.etages = ['Tous les niveaux', ...Array.from(etagesSet)];
  }

  // Appliquer les filtres
  applyFilters(): void {
    this.filteredBoutiques = this.boutiques.filter(boutique => {
      // Filtre par nom
      const matchesSearch = !this.searchTerm.trim() || 
        boutique.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        boutique.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Filtre par catégorie
      const matchesCategorie = this.selectedCategorie === 'Toutes' || 
        boutique.categorie === this.selectedCategorie;

      // Filtre par étage
      const matchesEtage = this.selectedEtage === 'Tous les niveaux' || 
        boutique.etage === this.selectedEtage;

      // Filtre par heures
      let matchesHeures = true;
      if (this.heureDebutFilter && this.heureFinFilter) {
        const debutMinutes = this.timeToMinutes(this.heureDebutFilter);
        const finMinutes = this.timeToMinutes(this.heureFinFilter);
        const ouvertureMinutes = this.timeToMinutes(boutique.heureOuverture);
        const fermetureMinutes = this.timeToMinutes(boutique.heureFermeture);

        // La boutique doit être ouverte pendant la plage horaire demandée
        matchesHeures = ouvertureMinutes <= debutMinutes && fermetureMinutes >= finMinutes;
      }

      return matchesSearch && matchesCategorie && matchesEtage && matchesHeures;
    });

    this.currentPage = 1;
    this.calculateTotalPages();
  }

  // Convertir l'heure en minutes
  timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // Calculer le nombre total de pages
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.filteredBoutiques.length / this.itemsPerPage);
  }

  // Obtenir les boutiques de la page actuelle
  getPaginatedBoutiques(): Boutique[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredBoutiques.slice(startIndex, endIndex);
  }

  // Changer de page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Obtenir les numéros de pages à afficher
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxPagesToShow = 5;

    if (this.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(this.totalPages);
      }
    }

    return pages;
  }

  // Vérifier si une boutique est ouverte
  isOpen(boutique: Boutique): boolean {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const ouvertureMinutes = this.timeToMinutes(boutique.heureOuverture);
    const fermetureMinutes = this.timeToMinutes(boutique.heureFermeture);
    
    return currentTime >= ouvertureMinutes && currentTime < fermetureMinutes;
  }

  // Obtenir le statut d'ouverture
  getStatus(boutique: Boutique): { text: string; class: string } {
    if (this.isOpen(boutique)) {
      return { text: 'Ouvert', class: 'status-open' };
    }
    return { text: 'Fermé', class: 'status-closed' };
  }

  // Sélectionner une catégorie
  selectCategorie(categorie: string): void {
    this.selectedCategorie = categorie;
    this.applyFilters();
  }

  // Réinitialiser les filtres
  resetFilters(): void {
    this.searchTerm = '';
    this.selectedCategorie = 'Toutes';
    this.selectedEtage = 'Tous les niveaux';
    this.heureDebutFilter = '';
    this.heureFinFilter = '';
    this.applyFilters();
  }

  // Naviguer vers les détails d'une boutique
  viewBoutiqueDetails(boutique: Boutique): void {
    // TODO: Implémenter la navigation vers les détails de la boutique
    console.log('View details:', boutique.nom);
    // this.router.navigate(['/client/boutique', boutique.id]);
  }

  // Vérifier si le centre est ouvert
  isCentreOpen(): boolean {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const ouvertureMinutes = this.timeToMinutes(this.centre.heureOuverture);
    const fermetureMinutes = this.timeToMinutes(this.centre.heureFermeture);
    
    return currentTime >= ouvertureMinutes && currentTime < fermetureMinutes;
  }

  // Formater l'heure
  formatTime(time: string): string {
    return time;
  }
}
