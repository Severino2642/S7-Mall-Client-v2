import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {StockCPLModel} from "../../../../models/stock.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {StockService} from "../../../../services/stock.service/stock.service";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {MouvementCaisse, MouvementCaisseCPLModel} from "../../../../models/mouvement-caisse.model";
import {MouvementCaisseService} from "../../../../services/mouvement_caisse.service/mouvement-caisse.service";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {
  StockFillesListeComponent
} from "../../../proprietaire/boutique/stock/onglet/stock-filles-liste/stock-filles-liste.component";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";

@Component({
  selector: 'app-mouvement-caisse-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, StockFillesListeComponent, RouterLink],
  templateUrl: './mouvement-caisse-details.component.html',
  styleUrl: './mouvement-caisse-details.component.css'
})
export class MouvementCaisseDetailsComponent {
  item?: MouvementCaisseCPLModel | null;
  loading = false;
  activeTab: 'tab1' = 'tab1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: MouvementCaisseService
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
  editItem(): void {
    if (this.item?._id) {
      this.router.navigate(['caisse/mouvement/update', this.item._id]);
    }
  }

  async deleteItem(): Promise<void> {
    if (this.item?._id) {
      await this.itemService.delete(this.item._id);
      this.router.navigate(['caisse/mouvement']);
    }
  }

  // Retour à la liste
  goBack(): void {
    this.router.navigate(['caisse/mouvement']);
  }

  async setStatus(): Promise<void> {
    let res = await this.itemService.valider(this.item?._id||'');
    if (this.item && res){
      this.item.status = ConstanteUtil.ETAT_VALIDER;
    }
  }

  protected readonly MouvementCaisse = MouvementCaisse;
  protected readonly ConstanteUtil = ConstanteUtil;
  protected readonly UtilitaireUtil = UtilitaireUtil;
}
