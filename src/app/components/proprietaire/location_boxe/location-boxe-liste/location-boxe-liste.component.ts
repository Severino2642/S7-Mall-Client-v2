import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {BoutiqueCPLModel} from "../../../../models/boutique.model";
import {PaymentLoyerCPLModel} from "../../../../models/payment-loyer.model";
import {PaymentLoyerService} from "../../../../services/payment_loyer.service/payment-loyer.service";
import {BoutiqueService} from "../../../../services/boutique.service/boutique.service";
import {Router, RouterLink} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {LocationBoxe, LocationBoxeCPLModel} from "../../../../models/location-boxe.model";
import {LocationBoxeService} from "../../../../services/location_boxe.service/location-boxe.service";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-location-boxe-liste',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './location-boxe-liste.component.html',
  styleUrl: './location-boxe-liste.component.css'
})
export class LocationBoxeListeComponent {
  loading = false;
  errorMessage = '';
  // filtres
  filters = {
    centreCommercial: "",
    boutique: "",
    boxe: "",
    proprietaire:"",
    date_min: undefined,
    date_max: undefined,
    status: 0,
  };

  status = [
    {val : 0, label : "TOUS"},
    {val : 1, label : "DISPONIBLE"},
    {val : 3, label : "BLOQUER"},
    {val : 4, label : "EN COURS"},
    {val : 5, label : "EXPIRER"},

  ];


  // Recapitulation ou Stats
  statistics = {
    totalListe: 0,
    totalDisponible:0,
    totalBloquer:0,
    totalLoyer:0
  };

  // Objet Miova2
  items : LocationBoxeCPLModel[] = [];
  filteredItems : LocationBoxeCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  roleUser = "";
  constructor(
    private itemService: LocationBoxeService,
    private router : Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    const auth = StorageUtil.getFromStorage<any>("auth");
    this.roleUser = auth.role.val;
    await this.loadItems();
    this.applyFilters();
    this.loadStats();
    this.updatePagination();
  }

  async loadItems(): Promise<void> {
    this.loading = true;
    const auth = StorageUtil.getFromStorage<any>("auth");
    let res = null;
    if (this.roleUser === ConstanteUtil.role_proprietaire){
      res = await this.itemService.getCPLByIdProprietaire(auth.idUser);
    }else if (this.roleUser === ConstanteUtil.role_centre_commercial){
      res = await this.itemService.getCPLByIdCentreCommercial(auth.idUser);
    }
    if (res!=null){
      this.items = res;
    }
    this.loading = false;
  }

  loadStats():void{
    this.statistics.totalListe = this.filteredItems.length;
    this.statistics.totalDisponible = 0;
    this.statistics.totalBloquer = 0;
    this.statistics.totalLoyer = 0;
    this.filteredItems.forEach(item => {
      if (item.status == ConstanteUtil.ETAT_DISPONIBLE){
        this.statistics.totalDisponible += 1;
      }else if (item.status == ConstanteUtil.ETAT_OCCUPEE){
        this.statistics.totalBloquer += 1;
      }
      this.statistics.totalLoyer += item.loyer || 0;
    });
  }

  applyFilters():void{
    this.filteredItems = this.items.filter(item => {
      if (this.filters.centreCommercial !== "" && !UtilitaireUtil.compareMotCle(item.centreCommercial?.nom, this.filters.centreCommercial)) {
        return false;
      }
      if (this.filters.boutique !== "" && !UtilitaireUtil.compareMotCle(item.boutique?.nom, this.filters.boutique)) {
        return false;
      }
      if (this.filters.boxe !== "" && !UtilitaireUtil.compareMotCle(item.boxe?.nom, this.filters.boxe)) {
        return false;
      }
      if (this.filters.proprietaire !== "" && !UtilitaireUtil.compareMotCle(item.proprietaire?.nom+" "+item.proprietaire?.prenom, this.filters.proprietaire)) {
        return false;
      }
      if (item.date != undefined) {
        if (this.filters.date_min != undefined && new Date(item.date).getTime() < new Date(this.filters.date_min).getTime()) {
          return false;
        }
        if (this.filters.date_max != undefined && new Date(item.date).getTime() > new Date(this.filters.date_max).getTime()) {
          return false;
        }
      }

      if (this.filters.status != 0 && this.filters.status < 4 && item.status != this.filters.status) {
        return false;
      }
      if (item.date_expiration!=undefined){
        const dateNow = new Date();
        if (this.filters.status == 4 && new Date(item.date_expiration).getTime() < dateNow.getTime()) {
          return false;
        }
        if (this.filters.status == 5 && new Date(item.date_expiration).getTime() >= dateNow.getTime()) {
          return false;
        }
      }
      return true;
    });

    this.loadStats();
  }

  resetFilters(): void {
    this.filters = {
      centreCommercial: "",
      boutique: "",
      boxe: "",
      proprietaire:"",
      date_min: undefined,
      date_max: undefined,
      status: 0,
    };
    this.applyFilters();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  getPaginatedItems(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredItems.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }


  editItem(item:any): void {
    this.router.navigate(['owner/location_boxe/update', item._id]);
  }

  // Supprimer une facture
  async deleteItem(item:any): Promise<void> {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      await this.itemService.delete(item._id||"");
      await this.loadItems();
      this.applyFilters();
    }
  }

  protected readonly ConstanteUtil = ConstanteUtil;
  protected readonly UtilitaireUtil = UtilitaireUtil;
  protected readonly LocationBoxe = LocationBoxe;
}
