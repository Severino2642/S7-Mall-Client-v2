import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProprietaireModel} from "../../../../models/proprietaire.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ProprietaireService} from "../../../../services/proprietaire.service/proprietaire.service";
import {StorageUtil} from "../../../../utils/storage.util";
import {LocationBoxe, LocationBoxeCPLModel} from "../../../../models/location-boxe.model";
import {LocationBoxeService} from "../../../../services/location_boxe.service/location-boxe.service";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {
  FichierListeOngletComponent
} from "../../../fichier_rattacher/fichier-liste-onglet/fichier-liste-onglet.component";
import {
  ManagerOngletListeComponent
} from "../../boutique/boutique/onglet/manager-onglet-liste/manager-onglet-liste.component";
import {
  PaymentLoyerOngletListeComponent
} from "../../boutique/boutique/onglet/payment-loyer-onglet-liste/payment-loyer-onglet-liste.component";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";

@Component({
  selector: 'app-location-boxe-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, RouterLink, FichierListeOngletComponent, ManagerOngletListeComponent, PaymentLoyerOngletListeComponent],
  templateUrl: './location-boxe-details.component.html',
  styleUrl: './location-boxe-details.component.css'
})
export class LocationBoxeDetailsComponent {
  item?: LocationBoxeCPLModel | null;
  loading = false;
  activeTab: 'tab1'|'tab2'|'tab3' = 'tab1';
  userRole = "";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: LocationBoxeService
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
    this.item = await this.itemService.getCPLById(id);
    this.loading = false;
  }

  // Changer d'onglet
  changeTab(tab: 'tab1'|'tab2'|'tab3'): void {
    this.activeTab = tab;
  }

  editItem(): void {
    if (this.item?._id) {
      this.router.navigate(['owner/location_boxe/update', this.item._id]);
    }
  }

  async deleteItem(): Promise<void> {
    if (confirm("Etes-vous sûr de vouloir supprimer cette location ?")) {
      if (this.item?._id) {
        await this.itemService.delete(this.item._id);
        this.goBack();
      }
    }
  }

  goBack(): void {
    this.router.navigate(['owner/location_boxe/']);
  }

  async bloquer():Promise<void>{
    if (this.item?._id){
      let res = await this.itemService.bloquer(this.item._id);
      this.item.status = res?.status;
    }
  }

  async debloquer():Promise<void>{
    if (this.item?._id){
      let res = await this.itemService.debloquer(this.item._id);
      this.item.status = res?.status;
    }
  }

  goToPayement(): void {
    if (this.item?._id) {
      this.router.navigate(
        ['owner/payment_loyer/create'],
        {
          queryParams: {
            idContrat: this.item._id,
            montant: this.item.loyer || 0,
          }
        }
      );
    }
  }
  protected readonly ConstanteUtil = ConstanteUtil;
  protected readonly LocationBoxe = LocationBoxe;
  protected readonly UtilitaireUtil = UtilitaireUtil;
}
