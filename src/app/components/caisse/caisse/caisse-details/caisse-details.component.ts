import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {OffreDeLocationCPLModel} from "../../../../models/offre_location.model";
import {ActivatedRoute, Router} from "@angular/router";
import {OffreLocationServiceService} from "../../../../services/offre_location.service/offre-location.service.service";
import {CaisseModel} from "../../../../models/caisse.model";
import {CaisseService} from "../../../../services/caisse.service/caisse.service";
import {
  DemandeLocationListeOngletComponent
} from "../../../admin/offre_location/onglet/demande-location.liste.onglet/demande-location.liste.onglet.component";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {MouvementCaisseListeComponent} from "../onglet/mouvement-caisse-liste/mouvement-caisse-liste.component";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";

@Component({
  selector: 'app-caisse-details',
  standalone: true,
  imports: [CommonModule, DemandeLocationListeOngletComponent, HeaderComponent, NavbarComponent, MouvementCaisseListeComponent],
  templateUrl: './caisse-details.component.html',
  styleUrl: './caisse-details.component.css'
})
export class CaisseDetailsComponent {

  item?: CaisseModel | null;
  loading = false;
  activeTab: 'tab1' = 'tab1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: CaisseService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    if (id) {
      await this.loadItem(id);
    }
  }

  async loadItem(id: string): Promise<void> {
    this.loading = true;
    this.item = await this.itemService.getById(id);
    this.loading = false;
  }

  // Changer d'onglet
  changeTab(tab: 'tab1'): void {
    this.activeTab = tab;
  }

  editItem(): void {
    if (this.item?._id) {
      this.router.navigate(['caisse/update', this.item._id]);
    }
  }

  async deleteItem(): Promise<void> {
    if (this.item?._id) {
      await this.itemService.delete(this.item._id);
      this.router.navigate(['caisse/']);
    }
  }

  // Retour à la liste
  goBack(): void {
    this.router.navigate(['caisse/']);
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
}
