import { Component } from '@angular/core';
import {CommandeCPLModel} from "../../../../../models/commande.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CommandeService} from "../../../../../services/commande.service/commande.service";
import {BonDeCommande, BonDeCommandeCPLModel} from "../../../../../models/bon-de-commande.model";
import {BonDeCommandeService} from "../../../../../services/bon-de-commande.service/bon-de-commande.service";
import {CommonModule} from "@angular/common";
import {
  BonCommandeOngletListeComponent
} from "../../commande/onglet/bon-commande-onglet-liste/bon-commande-onglet-liste.component";
import {
  CommandeFillesListeComponent
} from "../../commande/onglet/commande-filles-liste/commande-filles-liste.component";
import {HeaderComponent} from "../../../header.component/header.component";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";
import {BonCommandeFillesListeComponent} from "../onglet/bon-commande-filles-liste/bon-commande-filles-liste.component";

@Component({
  selector: 'app-market-bon-commande-details',
  standalone: true,
  imports: [CommonModule, BonCommandeOngletListeComponent, CommandeFillesListeComponent, HeaderComponent, BonCommandeFillesListeComponent],
  templateUrl: './market-bon-commande-details.component.html',
  styleUrl: './market-bon-commande-details.component.css'
})
export class MarketBonCommandeDetailsComponent {
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
    this.router.navigate(['client/market/commande/details', this.item?.idCommande]);
  }

  // async setStatus(): Promise<void> {
  //   let res = await this.itemService.valider(this.item?._id||'');
  //   if (this.item && res){
  //     this.item.status = ConstanteUtil.ETAT_VALIDER;
  //   }
  // }

  // goToPayement(): void {
  //   if (this.item?._id) {
  //     this.router.navigate(
  //       ['caisse/mouvement/create'],
  //       {
  //         queryParams: {
  //           type: 'entrer',
  //           idSource: this.item._id,
  //           designation: `Paiement de la vente ${this.item._id}`,
  //           debit: this.item.montantRestant || 0,
  //           maxDebit: this.item.montantRestant || 0
  //         }
  //       }
  //     );
  //   }
  // }
  protected readonly UtilitaireUtil = UtilitaireUtil;
  protected readonly BonDeCommande = BonDeCommande;
}
