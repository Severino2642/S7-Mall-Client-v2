import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {OffreDeLocationCPLModel} from "../../../../models/offre_location.model";
import {OffreLocationServiceService} from "../../../../services/offre_location.service/offre-location.service.service";
import {FileModel} from "../../../../models/file.model";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";
import {FormsModule} from "@angular/forms";
import {DemandeLocationService} from "../../../../services/demande_location.service/demande-location.service";
import {StorageUtil} from "../../../../utils/storage.util";

@Component({
  selector: 'app-offre-location.details',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HeaderComponent, FormsModule],
  templateUrl: './offre-location.details.component.html',
  styleUrl: './offre-location.details.component.css'
})
export class OffreLocationDetailsFrontOfficeComponent {
  item?: OffreDeLocationCPLModel | null;
  loading = false;

  // Galerie d'images
  currentImageIndex = 0;
  showLightbox = false;
  lightboxImageIndex = 0;
  propositionLoyer = 0;

  // Exemple de données (à remplacer par votre API)

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: OffreLocationServiceService,
    private demandeService:DemandeLocationService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    if (id) {
      await this.loadItem(id);
    }
  }

  async loadItem(id: string): Promise<void> {
    this.loading = true;
    this.item = await this.itemService.getCPLById(id);
    this.propositionLoyer = this.item?.montantLoyer || 0;
    console.log("Détails de l'offre de location:", this.item);
    this.loading = false;
  }

  goBack(): void {
    this.router.navigate(['owner/offreLocation/liste']);
  }

  // Obtenir l'image principale actuelle
  getCurrentImage(): FileModel | undefined {
    return this.item?.autrePhoto?.[this.currentImageIndex];
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
    if (this.item && this.item.autrePhoto) {
      this.lightboxImageIndex = (this.lightboxImageIndex + 1) % this.item.autrePhoto.length;
    }
  }

  // Image précédente dans la lightbox
  previousImage(): void {
    if (this.item && this.item.autrePhoto) {
      this.lightboxImageIndex = this.lightboxImageIndex === 0
        ? this.item.autrePhoto.length - 1
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

  ngOnDestroy(): void {
    document.body.style.overflow = 'auto';
  }

  async envoyerDemande():Promise<void>{
    this.loading = true;
    const auth = StorageUtil.getFromStorage<any>("auth");
    const data = {
      idProprietaire:auth.idUser,
      idOffreLocation:this.item?._id,
      montantLoyer:this.propositionLoyer
    }
    await this.demandeService.create(data);
    alert("Demande envoyer");
    this.loading = false;
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
}
