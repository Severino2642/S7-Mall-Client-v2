import { Component } from '@angular/core';
import {StockCPLModel} from "../../../../../models/stock.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {StockService} from "../../../../../services/stock.service/stock.service";
import {Vente, VenteCPLModel} from "../../../../../models/vente.model";
import {VenteService} from "../../../../../services/vente.service/vente.service";
import {ConstanteUtil} from "../../../../../utils/constante.util";
import {CommonModule, DatePipe, NgIf} from "@angular/common";
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";
import {StockFillesListeComponent} from "../../stock/onglet/stock-filles-liste/stock-filles-liste.component";
import {VenteFillesListeComponent} from "../onglet/vente-filles-liste/vente-filles-liste.component";
import {StockListeComponent} from "../onglet/stock-liste/stock-liste.component";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";
import {PayementListeComponent} from "../onglet/payement-liste/payement-liste.component";

@Component({
  selector: 'app-vente-details',
  standalone: true,
  imports: [
    DatePipe,
    HeaderComponent,
    NavbarComponent,
    CommonModule,
    StockFillesListeComponent,
    RouterLink,
    VenteFillesListeComponent,
    StockListeComponent,
    PayementListeComponent
  ],
  templateUrl: './vente-details.component.html',
  styleUrl: './vente-details.component.css'
})
export class VenteDetailsComponent {
  item?: VenteCPLModel | null;
  loading = false;
  activeTab: 'tab1' | 'tab2' | 'tab3' = 'tab1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: VenteService
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

  // Modifier le boxe
  editBoxe(): void {
    if (this.item?._id) {
      this.router.navigate(['boutique/vente/update', this.item._id]);
    }
  }

  async deleteBoxe(): Promise<void> {
    if (this.item?._id) {
      await this.itemService.deleteMereFille(this.item._id);
      this.router.navigate(['boutique/vente']);
    }
  }

  // Retour à la liste
  goBack(): void {
    this.router.navigate(['boutique/vente']);
  }

  async setStatus(): Promise<void> {
    let res = await this.itemService.valider(this.item?._id||'');
    if (this.item && res){
      this.item.status = ConstanteUtil.ETAT_VALIDER;
    }
  }

  goToPayement(): void {
    if (this.item?._id) {
      this.router.navigate(
        ['caisse/mouvement/create'],
        {
          queryParams: {
            type: 'entrer',
            idSource: this.item._id,
            designation: `Paiement de la vente ${this.item._id}`,
            debit: this.item.montantRestant || 0,
            maxDebit: this.item.montantRestant || 0
          }
        }
      );
    }
  }

  protected readonly Vente = Vente;
  protected readonly ConstanteUtil = ConstanteUtil;
  protected readonly UtilitaireUtil = UtilitaireUtil;
}
