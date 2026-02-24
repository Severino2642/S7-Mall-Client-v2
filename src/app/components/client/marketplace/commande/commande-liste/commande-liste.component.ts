import { Component } from '@angular/core';
import {VenteCPLModel} from "../../../../../models/vente.model";
import {VenteService} from "../../../../../services/vente.service/vente.service";
import {Router, RouterLink} from "@angular/router";
import {StorageUtil} from "../../../../../utils/storage.util";
import {BoutiqueModel} from "../../../../../models/boutique.model";
import {CommonModule} from "@angular/common";
import {CommandeCPLModel} from "../../../../../models/commande.model";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";
import {HeaderComponent} from "../../../header.component/header.component";
import {FormsModule} from "@angular/forms";
import {CommandeService} from "../../../../../services/commande.service/commande.service";

@Component({
  selector: 'app-commande-liste',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule, RouterLink],
  templateUrl: './commande-liste.component.html',
  styleUrl: './commande-liste.component.css'
})
export class CommandeListeComponent {
  loading = false;
  errorMessage = '';
  // filtres
  filters = {
    designation: "",
    montant_min: undefined,
    montant_max: undefined,
    quantite_min: undefined,
    quantite_max: undefined,
    date_min: undefined,
    date_max: undefined,
  };

  // Recapitulation ou Stats
  statistics = {
    totalListe: 0,
    totalQuantite:0,
    totalMontant:0
  };

  // Objet Miova2
  items : CommandeCPLModel[] = [];
  filteredItems : CommandeCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private itemService: CommandeService,
    private router : Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadItems();
    this.applyFilters();
    this.loadStats();
    this.updatePagination();
  }

  async loadItems(): Promise<void> {
    this.loading = true;
    var auth = StorageUtil.getFromStorage<any>("auth");
    var res = await this.itemService.getCPLByIdClient(auth.idUser||"");
    if (res!=null){
      this.items = res;
    }
    this.loading = false;
  }

  loadStats():void{
    this.statistics.totalListe = this.filteredItems.length;
    this.statistics.totalMontant = 0;
    this.statistics.totalQuantite = 0;
    this.filteredItems.forEach(item => {
      this.statistics.totalMontant += item.montantTotal || 0;
      this.statistics.totalQuantite += item.quantiteTotal || 0;
    });
  }

  applyFilters():void{
    this.filteredItems = this.items.filter(item => {
      if (this.filters.designation !== "" && !UtilitaireUtil.compareMotCle(item.designation, this.filters.designation)) {
        return false;
      }
      if (item.montantTotal != undefined){
        if (this.filters.montant_min != undefined && item.montantTotal < this.filters.montant_min) {
          return false;
        }
        if (this.filters.montant_max != undefined && item.montantTotal > this.filters.montant_max) {
          return false;
        }
      }

      if (item.quantiteTotal != undefined){
        if (this.filters.quantite_min != undefined && item.quantiteTotal < this.filters.quantite_min) {
          return false;
        }
        if (this.filters.quantite_max != undefined && item.quantiteTotal > this.filters.quantite_max) {
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

      return true;
    });

    this.loadStats();
  }

  resetFilters(): void {
    this.filters = {
      designation: "",
      montant_min: undefined,
      montant_max: undefined,
      quantite_min: undefined,
      quantite_max: undefined,
      date_min: undefined,
      date_max: undefined,
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

  protected readonly UtilitaireUtil = UtilitaireUtil;
}
