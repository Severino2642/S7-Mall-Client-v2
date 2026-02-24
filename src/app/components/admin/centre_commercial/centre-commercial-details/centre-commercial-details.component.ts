import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {BoutiqueCPLModel} from "../../../../models/boutique.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BoutiqueService} from "../../../../services/boutique.service/boutique.service";
import {StorageUtil} from "../../../../utils/storage.util";
import {CentreCommercial, CentreCommercialModel} from "../../../../models/mall.model";
import {MallService} from "../../../../services/mall.service/mall.service";
import {
  FichierListeOngletComponent
} from "../../../fichier_rattacher/fichier-liste-onglet/fichier-liste-onglet.component";
import {HeaderComponent} from "../../header.component/header.component";
import {
  ManagerOngletListeComponent
} from "../../../proprietaire/boutique/boutique/onglet/manager-onglet-liste/manager-onglet-liste.component";
import {NavbarComponent} from "../../navbar.component/navbar.component";
import {
  PaymentLoyerOngletListeComponent
} from "../../../proprietaire/boutique/boutique/onglet/payment-loyer-onglet-liste/payment-loyer-onglet-liste.component";

@Component({
  selector: 'app-centre-commercial-details',
  standalone: true,
  imports: [CommonModule, FichierListeOngletComponent, HeaderComponent, ManagerOngletListeComponent, NavbarComponent, PaymentLoyerOngletListeComponent, RouterLink],
  templateUrl: './centre-commercial-details.component.html',
  styleUrl: './centre-commercial-details.component.css'
})
export class CentreCommercialDetailsComponent {
  item?: CentreCommercialModel | null;
  loading = false;
  activeTab: 'tab1'|'tab2'|'tab3' = 'tab1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: MallService
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
  changeTab(tab: 'tab1'|'tab2'|'tab3'): void {
    this.activeTab = tab;
  }

  editItem(): void {
    if (this.item?._id) {
      this.router.navigate(['admin/centre_commercial/update', this.item._id]);
    }
  }

  async ouvrir() : Promise<void>{
    if (this.item?._id != null) {
      const updatedItem = await this.itemService.ouvrir(this.item?._id);
      this.item.isOuvert = updatedItem?.isOuvert;
    }
  }

  async fermer() : Promise<void>{
    if (this.item?._id != null) {
      const updatedItem = await this.itemService.fermer(this.item?._id);
      this.item.isOuvert = updatedItem?.isOuvert;
    }
  }

  protected readonly CentreCommercial = CentreCommercial;
}
