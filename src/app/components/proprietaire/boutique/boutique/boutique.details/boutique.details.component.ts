import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {OffreDeLocationCPLModel} from "../../../../../models/offre_location.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {
  OffreLocationServiceService
} from "../../../../../services/offre_location.service/offre-location.service.service";
import {Boutique, BoutiqueCPLModel} from "../../../../../models/boutique.model";
import {BoutiqueService} from "../../../../../services/boutique.service/boutique.service";
import { UtilitaireUtil } from '../../../../../utils/utilitaire.util';
import {
  DemandeLocationListeOngletComponent
} from "../../../../admin/offre_location/onglet/demande-location.liste.onglet/demande-location.liste.onglet.component";
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";
import {ConstanteUtil} from "../../../../../utils/constante.util";
import {StorageUtil} from "../../../../../utils/storage.util";
import {ManagerOngletListeComponent} from "../onglet/manager-onglet-liste/manager-onglet-liste.component";
import {
  PaymentLoyerOngletListeComponent
} from "../onglet/payment-loyer-onglet-liste/payment-loyer-onglet-liste.component";
import {
  FichierListeOngletComponent
} from "../../../../fichier_rattacher/fichier-liste-onglet/fichier-liste-onglet.component";

@Component({
  selector: 'app-boutique.details',
  standalone: true,
  imports: [CommonModule, DemandeLocationListeOngletComponent, HeaderComponent, NavbarComponent, RouterLink, ManagerOngletListeComponent, PaymentLoyerOngletListeComponent, FichierListeOngletComponent],
  templateUrl: './boutique.details.component.html',
  styleUrl: './boutique.details.component.css'
})
export class BoutiqueDetailsComponent {

  item?: BoutiqueCPLModel | null;
  loading = false;
  activeTab: 'tab1'|'tab2'|'tab3' = 'tab1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: BoutiqueService
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
  changeTab(tab: 'tab1'|'tab2'|'tab3'): void {
    this.activeTab = tab;
  }

  editItem(): void {
    if (this.item?._id) {
      this.router.navigate(['owner/boutique/update', this.item._id]);
    }
  }

  // Retour à la liste
  goBack(): void {
    this.router.navigate(['owner/boutique/']);
  }

  async ouvrirBoutique() : Promise<void>{
    if (this.item?._id != null) {
      const updatedItem = await this.itemService.ouvrir(this.item?._id);
      this.item.status = updatedItem?.status;
    }
  }

  async fermerBoutique() : Promise<void>{
    if (this.item?._id != null) {
      const updatedItem = await this.itemService.fermer(this.item?._id);
      this.item.status = updatedItem?.status;
    }
  }

  connectToBoutique(){
    StorageUtil.setToStorage("boutique", this.item);
    this.router.navigate(['boutique/produit']);
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;

  protected readonly Boutique = Boutique;
  protected readonly ConstanteUtil = ConstanteUtil;
}
