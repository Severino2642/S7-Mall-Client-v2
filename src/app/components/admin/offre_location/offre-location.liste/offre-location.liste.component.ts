import { Component } from '@angular/core';
import {BoxeModel} from "../../../../models/boxe.model";
import {BoxeService} from "../../../../services/boxe.service/boxe.service";
import {Router, RouterLink} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "../../navbar.component/navbar.component";
import {HeaderComponent} from "../../header.component/header.component";
import {OffreDeLocationCPLModel} from "../../../../models/offre_location.model";
import {OffreLocationServiceService} from "../../../../services/offre_location.service/offre-location.service.service";
import {FormsModule} from "@angular/forms";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";

@Component({
  selector: 'app-offre-location.liste',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HeaderComponent, FormsModule, RouterLink],
  templateUrl: './offre-location.liste.component.html',
  styleUrl: './offre-location.liste.component.css'
})
export class OffreLocationListeComponent {
  loading = false;
  errorMessage = '';
  // filtres
  filters = {
    boxe: "",
    montantLoyer_min: undefined,
    montantLoyer_max: undefined,
    date_min : undefined,
    date_max: undefined,
  };

  // Recapitulation ou Stats
  statistics = {
    totalListe: 0
  };

  // Objet Miova2
  items : OffreDeLocationCPLModel[] = [];
  filteredItems : OffreDeLocationCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private itemService: OffreLocationServiceService,
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
    var res = await this.itemService.getByIdCentreCommercial(auth?.idUser);
    if (res!=null){
      this.items = res;
      console.log("Offres de location chargées :", this.items);
    }
    this.loading = false;
  }

  loadStats():void{
    this.statistics.totalListe = this.filteredItems.length;
  }

  applyFilters():void{
    this.filteredItems = this.items.filter(item => {
      if (this.filters.boxe !== "" && item.nomBoxe !== this.filters.boxe) {
        return false;
      }
      if (item.montantLoyer != undefined){
        if (this.filters.montantLoyer_min != undefined && item.montantLoyer < this.filters.montantLoyer_min) {
          return false;
        }
        if (this.filters.montantLoyer_max != undefined && item.montantLoyer > this.filters.montantLoyer_max) {
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
      boxe: "",
      montantLoyer_min: undefined,
      montantLoyer_max: undefined,
      date_min : undefined,
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


  editItem(item:any): void {
    console.log('Edit item:', item._id);
    this.router.navigate(['admin/offreLocation/update', item._id]);
  }

  // Supprimer une facture
  async deleteItem(item:any): Promise<void> {
    console.log('Delete invoice:', item._id);
    await this.itemService.delete(item._id);
    console.log('After Delete invoice:', item._id);
    this.router.navigate(['admin/offreLocation/']);
  }

  calculateSurface(item:OffreDeLocationCPLModel|undefined): number {
    if (!item) return 0;
    return (item.longueurBoxe || 0) * (item.largeurBoxe || 0);
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
}
