import { Component } from '@angular/core';
import {BoxeModel} from "../../../../../models/boxe.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BoxeService} from "../../../../../services/boxe.service/boxe.service";
import {CommonModule} from "@angular/common";
import {Produit, ProduitCPLModel} from "../../../../../models/produit.model";
import {ProduitService} from "../../../../../services/produit.service/produit.service";
import {ConstanteUtil} from "../../../../../utils/constante.util";
import {
  FichierListeOngletComponent
} from "../../../../fichier_rattacher/fichier-liste-onglet/fichier-liste-onglet.component";
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";
import {
  OffreLocationOngletComponent
} from "../../../../admin/boxe/onglet/offre-location.onglet/offre-location.onglet.component";
import {ProduitVarianteListeComponent} from "../onglet/produit-variante-liste/produit-variante-liste.component";

@Component({
  selector: 'app-produit-details',
  standalone: true,
  imports: [CommonModule, FichierListeOngletComponent, HeaderComponent, NavbarComponent, OffreLocationOngletComponent, RouterLink, ProduitVarianteListeComponent],
  templateUrl: './produit-details.component.html',
  styleUrl: './produit-details.component.css'
})
export class ProduitDetailsComponent {
  item?: ProduitCPLModel | null;
  loading = false;
  activeTab: 'tab1' | 'tab2' = 'tab1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ProduitService
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
    this.loading = false;
  }

  // Changer d'onglet
  changeTab(tab: 'tab1' | 'tab2'): void {
    this.activeTab = tab;
  }

  // Modifier le boxe
  editBoxe(): void {
    if (this.item?._id) {
      this.router.navigate(['boutique/produit/update', this.item._id]);
    }
  }

  // Retour à la liste
  goBack(): void {
    this.router.navigate(['boutique/produit']);
  }

  async setStatus(): Promise<void> {
    let newStatus = ConstanteUtil.ETAT_DISPONIBLE;
    if (this.item?.status == ConstanteUtil.ETAT_DISPONIBLE) {
      newStatus = ConstanteUtil.ETAT_OCCUPEE;
    }
    await this.itemService.changerStatus(this.item?._id || '', newStatus);
    if (this.item){
      this.item.status = newStatus;
    }
  }

  protected readonly Produit = Produit;
  protected readonly ConstanteUtil = ConstanteUtil;
}
