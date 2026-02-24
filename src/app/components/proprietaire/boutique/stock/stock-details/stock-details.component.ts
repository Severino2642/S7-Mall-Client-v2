import { Component } from '@angular/core';
import {ProduitCPLModel} from "../../../../../models/produit.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProduitService} from "../../../../../services/produit.service/produit.service";
import {CommonModule} from "@angular/common";
import {Stock, StockCPLModel} from "../../../../../models/stock.model";
import {StockService} from "../../../../../services/stock.service/stock.service";
import { ConstanteUtil } from '../../../../../utils/constante.util';
import {
  FichierListeOngletComponent
} from "../../../../fichier_rattacher/fichier-liste-onglet/fichier-liste-onglet.component";
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";
import {
  ProduitVarianteListeComponent
} from "../../produit/onglet/produit-variante-liste/produit-variante-liste.component";
import {StockFillesListeComponent} from "../onglet/stock-filles-liste/stock-filles-liste.component";

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [CommonModule, FichierListeOngletComponent, HeaderComponent, NavbarComponent, ProduitVarianteListeComponent, RouterLink, StockFillesListeComponent],
  templateUrl: './stock-details.component.html',
  styleUrl: './stock-details.component.css'
})
export class StockDetailsComponent {
  item?: StockCPLModel | null;
  loading = false;
  activeTab: 'tab1' = 'tab1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: StockService
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
  changeTab(tab: 'tab1'): void {
    this.activeTab = tab;
  }

  // Modifier le boxe
  editBoxe(): void {
    if (this.item?._id) {
      this.router.navigate(['boutique/stock/update', this.item._id]);
    }
  }

  async deleteBoxe(): Promise<void> {
    if (this.item?._id) {
      await this.itemService.deleteMereFille(this.item._id);
      this.router.navigate(['boutique/stock']);
    }
  }

  // Retour à la liste
  goBack(): void {
    this.router.navigate(['boutique/stock']);
  }

  async setStatus(): Promise<void> {
    let res = await this.itemService.valider(this.item?._id||'');
    if (this.item && res){
      this.item.status = ConstanteUtil.ETAT_VALIDER;
    }
  }

  calculerQuantiteTotale(): number {
    if (!this.item || !this.item.filles) {
      return 0;
    }
    return this.item.filles.reduce((total, fille) => total + (fille.entree || 0)+(fille.sortie || 0), 0);
  }
  protected readonly ConstanteUtil = ConstanteUtil;
  protected readonly Stock = Stock;
}
