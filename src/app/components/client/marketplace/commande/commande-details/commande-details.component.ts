import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {VenteCPLModel} from "../../../../../models/vente.model";
import {ActivatedRoute, Router} from "@angular/router";
import {VenteService} from "../../../../../services/vente.service/vente.service";
import {CommandeCPLModel} from "../../../../../models/commande.model";
import {CommandeService} from "../../../../../services/commande.service/commande.service";
import {
  PayementListeComponent
} from "../../../../proprietaire/boutique/vente/onglet/payement-liste/payement-liste.component";
import {StockListeComponent} from "../../../../proprietaire/boutique/vente/onglet/stock-liste/stock-liste.component";
import {
  VenteFillesListeComponent
} from "../../../../proprietaire/boutique/vente/onglet/vente-filles-liste/vente-filles-liste.component";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";
import {CommandeFillesListeComponent} from "../onglet/commande-filles-liste/commande-filles-liste.component";
import {BonCommandeOngletListeComponent} from "../onglet/bon-commande-onglet-liste/bon-commande-onglet-liste.component";
import {HeaderComponent} from "../../../header.component/header.component";

@Component({
  selector: 'app-commande-details',
  standalone: true,
  imports: [CommonModule, PayementListeComponent, StockListeComponent, VenteFillesListeComponent, CommandeFillesListeComponent, BonCommandeOngletListeComponent, HeaderComponent],
  templateUrl: './commande-details.component.html',
  styleUrl: './commande-details.component.css'
})
export class CommandeDetailsComponent {
  item?: CommandeCPLModel | null;
  loading = false;
  activeTab: 'tab1' | 'tab2' = 'tab1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: CommandeService
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
    this.router.navigate(['client/market/commande']);
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
}
