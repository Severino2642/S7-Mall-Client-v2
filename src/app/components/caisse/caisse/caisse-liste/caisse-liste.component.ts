import { Component } from '@angular/core';
import {OffreDeLocationCPLModel} from "../../../../models/offre_location.model";
import {OffreLocationServiceService} from "../../../../services/offre_location.service/offre-location.service.service";
import {Router, RouterLink} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {CommonModule} from "@angular/common";
import {CaisseModel} from "../../../../models/caisse.model";
import {CaisseService} from "../../../../services/caisse.service/caisse.service";
import {BoutiqueModel} from "../../../../models/boutique.model";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";

@Component({
  selector: 'app-caisse-liste',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, NavbarComponent, RouterLink],
  templateUrl: './caisse-liste.component.html',
  styleUrl: './caisse-liste.component.css'
})
export class CaisseListeComponent {
  loading = false;
  errorMessage = '';
  // filtres
  filters = {
    nom: "",
    numero_compte: "",
    solde_min: undefined,
    solde_max: undefined
  };

  // Recapitulation ou Stats
  statistics = {
    totalListe: 0,
    totalDebit:0,
    totalCredit:0,
    totalSolde:0
  };

  // Objet Miova2
  items : CaisseModel[] = [];
  filteredItems : CaisseModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  idProprietaire = "";
  constructor(
    private itemService: CaisseService,
    private router : Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    const boutique = StorageUtil.getFromStorage<BoutiqueModel>("boutique");
    var auth = StorageUtil.getFromStorage<any>("auth");
    if (boutique){
      this.idProprietaire = boutique._id || "";
    }else {
      this.idProprietaire = auth?.idUser || "";
    }
    await this.loadItems();
    this.applyFilters();
    this.loadStats();
    this.updatePagination();
  }


  async loadItems(): Promise<void> {
    this.loading = true;

    var res = await this.itemService.getAllByidProprietaire(this.idProprietaire);
    if (res!=null){
      this.items = res;
    }
    this.loading = false;
  }

  loadStats():void{
    this.statistics.totalListe = this.filteredItems.length;
    this.statistics.totalCredit = 0;
    this.statistics.totalDebit = 0;
    this.statistics.totalSolde = 0;

    this.filteredItems.forEach(item => {
      this.statistics.totalCredit += item.total_credit || 0;
      this.statistics.totalDebit += item.total_debit || 0;
      this.statistics.totalSolde += item.solde || 0;
    });
  }

  applyFilters():void{
    this.filteredItems = this.items.filter(item => {
      if (this.filters.nom !== "" && !UtilitaireUtil.compareMotCle(item.nom, this.filters.nom)) {
        return false;
      }
      if (this.filters.numero_compte !== "" && !UtilitaireUtil.compareMotCle(item.numero_compte, this.filters.numero_compte)) {
        return false;
      }
      if (item.solde != undefined){
        if (this.filters.solde_min != undefined && item.solde < this.filters.solde_min) {
          return false;
        }
        if (this.filters.solde_max != undefined && item.solde > this.filters.solde_max) {
          return false;
        }
      }
      return true;
    });

    this.loadStats();
  }

  resetFilters(): void {
    this.filters = {
      nom: "",
      numero_compte: "",
      solde_min: undefined,
      solde_max: undefined
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
    this.router.navigate(['caisse/update', item._id]);
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
}
