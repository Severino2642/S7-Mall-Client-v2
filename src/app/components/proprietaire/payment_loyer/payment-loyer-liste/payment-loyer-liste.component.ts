import { Component } from '@angular/core';
import {BoutiqueCPLModel} from "../../../../models/boutique.model";
import {ManagerCPLModel} from "../../../../models/manager.model";
import {ManagerService} from "../../../../services/manager.service/manager.service";
import {BoutiqueService} from "../../../../services/boutique.service/boutique.service";
import {Router, RouterLink} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {CommonModule} from "@angular/common";
import {PaymentLoyer, PaymentLoyerCPLModel} from "../../../../models/payment-loyer.model";
import {PaymentLoyerService} from "../../../../services/payment_loyer.service/payment-loyer.service";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-payment-loyer-liste',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './payment-loyer-liste.component.html',
  styleUrl: './payment-loyer-liste.component.css'
})
export class PaymentLoyerListeComponent {
  loading = false;
  errorMessage = '';
  // filtres
  filters = {
    centreCommercial: "",
    boutique: "",
    boxe:"",
    proprietaire:"",
    mois: "",
    annee_min: undefined,
    annee_max: undefined,
    date_min: undefined,
    date_max: undefined,
    status: 0,
  };

  status = [
    {val : 0, label : "TOUS"},
    {val : 1, label : "EN ATTENTE"},
    {val : 11, label : "VALIDER"},
    {val : 31, label : "REJETER"}
  ];

  // Recapitulation ou Stats
  statistics = {
    totalListe: 0,
    totalEnAttente:0,
    totalValider:0,
    totalMontant:0
  };

  // Objet Miova2
  items : PaymentLoyerCPLModel[] = [];
  filteredItems : PaymentLoyerCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  roleUser = "";
  constructor(
    private itemService: PaymentLoyerService,
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
      res = await this.itemService.getByIdProprietaire(auth.idUser);
    }else if (this.roleUser === ConstanteUtil.role_centre_commercial){
      res = await this.itemService.getByIdCentreCommercial(auth.idUser);
    }
    if (res!=null){
      this.items = res;
    }
    this.loading = false;
  }

  loadStats():void{
    this.statistics.totalListe = this.filteredItems.length;
    this.statistics.totalEnAttente = 0;
    this.statistics.totalValider = 0;
    this.statistics.totalMontant = 0;
    this.filteredItems.forEach(item => {
      if (item.status == ConstanteUtil.ETAT_DISPONIBLE){
        this.statistics.totalEnAttente += 1;
      }else if (item.status == ConstanteUtil.ETAT_VALIDER){
        this.statistics.totalValider += 1;
      }
      this.statistics.totalMontant += item.montant || 0;
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
      if (this.filters.mois !== "" && item.mois !== this.filters.mois) {
        return false;
      }
      if (item.annee!=undefined){
        if (this.filters.annee_min != undefined && item.annee < this.filters.annee_min) {
          return false;
        }
        if (this.filters.annee_max != undefined && item.annee > this.filters.annee_max) {
          return false;
        }
      }

      if (item.date != undefined) {
        if (this.filters.date_min != undefined && new Date(item.date).getTime() < new Date(this.filters.date_min).getTime()) {
          return false;
        }
        if (this.filters.date_max != undefined && new Date(item.date).getTime() > new Date(this.filters.date_max).getTime()) {
          return false;
        }
      }

      if (this.filters.status != 0 && item.status != this.filters.status) {
        return false;
      }
      return true;
    });

    this.loadStats();
  }

  resetFilters(): void {
    this.filters = {
      centreCommercial: "",
      boutique: "",
      boxe:"",
      proprietaire: "",
      mois: "",
      annee_min: undefined,
      annee_max: undefined,
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
    this.router.navigate(['owner/manager/update', item._id]);
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
  protected readonly PaymentLoyer = PaymentLoyer;
}
