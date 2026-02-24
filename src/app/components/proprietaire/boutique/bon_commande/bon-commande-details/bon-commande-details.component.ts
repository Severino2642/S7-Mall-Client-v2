import { Component } from '@angular/core';
import {BonDeCommande, BonDeCommandeCPLModel} from "../../../../../models/bon-de-commande.model";
import {ActivatedRoute, Router} from "@angular/router";
import {BonDeCommandeService} from "../../../../../services/bon-de-commande.service/bon-de-commande.service";
import {CommonModule} from "@angular/common";
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";
import {PayementListeComponent} from "../../vente/onglet/payement-liste/payement-liste.component";
import {StockListeComponent} from "../../vente/onglet/stock-liste/stock-liste.component";
import {VenteFillesListeComponent} from "../../vente/onglet/vente-filles-liste/vente-filles-liste.component";
import {
  BonCommandeFillesListeComponent
} from "../../../../client/marketplace/bon_de_commande/onglet/bon-commande-filles-liste/bon-commande-filles-liste.component";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";
import {ConstanteUtil} from "../../../../../utils/constante.util";
import {BonCommandeFactureComponent} from "../onglet/bon-commande-facture/bon-commande-facture.component";

@Component({
  selector: 'app-bon-commande-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, PayementListeComponent, StockListeComponent, VenteFillesListeComponent, BonCommandeFillesListeComponent, BonCommandeFactureComponent],
  templateUrl: './bon-commande-details.component.html',
  styleUrl: './bon-commande-details.component.css'
})
export class BonCommandeDetailsComponent {
  item?: BonDeCommandeCPLModel | null;
  loading = false;
  activeTab: 'tab1' | 'tab2' = 'tab1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: BonDeCommandeService
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
  changeTab(tab: 'tab1'|'tab2'): void {
    this.activeTab = tab;
  }

  // Retour à la liste
  goBack(): void {
    this.router.navigate(['boutique/bon_commande']);
  }

  async valider(): Promise<void> {
    let res = await this.itemService.valider(this.item?._id||'');
    if (this.item && res){
      this.item.status = ConstanteUtil.ETAT_VALIDER;
    }
  }

  async rejeter(): Promise<void> {
    let res = await this.itemService.rejeter(this.item?._id||'');
    if (this.item && res){
      this.item.status = ConstanteUtil.ETAT_REJETER;
    }
  }

  goToFacture(): void {
    if (this.item?._id) {
      this.router.navigate(
        ['boutique/vente/create'],
        {
          queryParams: {
            idSource: this.item._id
          }
        }
      );
    }
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
  protected readonly BonDeCommande = BonDeCommande;
  protected readonly ConstanteUtil = ConstanteUtil;
}
