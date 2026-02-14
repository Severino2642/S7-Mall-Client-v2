import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {OffreLocationServiceService} from "../../../../services/offre_location.service/offre-location.service.service";
import {OffreDeLocation, OffreDeLocationCPLModel} from "../../../../models/offre_location.model";
import {HeaderComponent} from "../../header.component/header.component";
import {NavbarComponent} from "../../navbar.component/navbar.component";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";

@Component({
  selector: 'app-offre-location.details',
  standalone: true,
  imports: [
    HeaderComponent,
    NavbarComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './offre-location.details.component.html',
  styleUrl: './offre-location.details.component.css'
})
export class OffreLocationDetailsComponent implements OnInit{

  item?: OffreDeLocationCPLModel | null;
  loading = false;
  activeTab: 'tab1' = 'tab1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: OffreLocationServiceService
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
    console.log("Détails de l'offre de location:", this.item);
    this.loading = false;
  }

  // Changer d'onglet
  changeTab(tab: 'tab1'): void {
    this.activeTab = tab;
  }

  // Calculer la surface
  calculateSurface(): number {
    if (!this.item) return 0;
    return (this.item.longueurBoxe || 0) * (this.item.largeurBoxe || 0);
  }


  editItem(): void {
    if (this.item?._id) {
      this.router.navigate(['admin/offreLocation/update', this.item._id]);
    }
  }

  async deleteItem(): Promise<void> {
    if (this.item?._id) {
      await this.itemService.delete(this.item._id);
      this.router.navigate(['admin/offreLocation/']);
    }
  }

  // Retour à la liste
  goBack(): void {
    this.router.navigate(['admin/offreLocation']);
  }

  protected readonly OffreDeLocation = OffreDeLocation;
  protected readonly UtilitaireUtil = UtilitaireUtil;
}
