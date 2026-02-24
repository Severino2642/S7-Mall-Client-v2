import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {CentreCommercialModel} from "../../../models/mall.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MallService} from "../../../services/mall.service/mall.service";
import {ProprietaireModel} from "../../../models/proprietaire.model";
import {ProprietaireService} from "../../../services/proprietaire.service/proprietaire.service";
import {FichierListeOngletComponent} from "../../fichier_rattacher/fichier-liste-onglet/fichier-liste-onglet.component";
import {HeaderComponent} from "../../admin/header.component/header.component";
import {NavbarComponent} from "../../admin/navbar.component/navbar.component";
import {
  ProduitVarianteListeComponent
} from "../boutique/produit/onglet/produit-variante-liste/produit-variante-liste.component";
import {UtilitaireUtil} from "../../../utils/utilitaire.util";
import {StorageUtil} from "../../../utils/storage.util";
import {ConstanteUtil} from "../../../utils/constante.util";

@Component({
  selector: 'app-proprietaire-details',
  standalone: true,
  imports: [CommonModule, FichierListeOngletComponent, HeaderComponent, NavbarComponent, ProduitVarianteListeComponent],
  templateUrl: './proprietaire-details.component.html',
  styleUrl: './proprietaire-details.component.css'
})
export class ProprietaireDetailsComponent {
  item?: ProprietaireModel | null;
  loading = false;
  activeTab: 'tab1'|'tab2'|'tab3' = 'tab1';
  userRole = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ProprietaireService
  ) {}

  async ngOnInit(): Promise<void> {
    const auth = StorageUtil.getFromStorage<any>("auth");
    this.userRole = auth?.role.val;
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
  changeTab(tab: 'tab1'|'tab2'|'tab3'): void {
    this.activeTab = tab;
  }

  editItem(): void {
    if (this.item?._id) {
      this.router.navigate(['owner/update', this.item._id]);
    }
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
  protected readonly ConstanteUtil = ConstanteUtil;
}
