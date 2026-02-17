import { Component } from '@angular/core';
import {StockCPLModel} from "../../../../../models/stock.model";
import {StockService} from "../../../../../services/stock.service/stock.service";
import {Router, RouterLink} from "@angular/router";
import {StorageUtil} from "../../../../../utils/storage.util";
import {BoutiqueModel} from "../../../../../models/boutique.model";
import {Vente, VenteCPLModel} from "../../../../../models/vente.model";
import {CommonModule} from "@angular/common";
import {VenteService} from "../../../../../services/vente.service/vente.service";
import {ConstanteUtil} from "../../../../../utils/constante.util";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";

@Component({
  selector: 'app-vente-liste',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, NavbarComponent, RouterLink],
  templateUrl: './vente-liste.component.html',
  styleUrl: './vente-liste.component.css'
})
export class VenteListeComponent {
  loading = false;
  errorMessage = '';
  // filtres
  filters = {
    designation: "",
    client: "",
    montant_min: undefined,
    montant_max: undefined,
    date_min: undefined,
    date_max: undefined,
    status: 0,
  };

  status = [
    {val : 0, label : "TOUS"},
    {val : 1, label : "EN ATTENTE"},
    {val : 11, label : "VALIDEE"}
  ];


  // Recapitulation ou Stats
  statistics = {
    totalListe: 0,
    totalEnAttente:0,
    totalValider:0,
    totalQuantite:0,
    totalMontant:0
  };

  // Objet Miova2
  items : VenteCPLModel[] = [];
  filteredItems : VenteCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private itemService: VenteService,
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
    var boutique = StorageUtil.getFromStorage<BoutiqueModel>("boutique");
    var res = await this.itemService.getCPLByIdBoutique(boutique?._id||"");
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
    this.statistics.totalQuantite = 0;
    this.filteredItems.forEach(item => {
      if (item.status == ConstanteUtil.ETAT_DISPONIBLE){
        this.statistics.totalEnAttente += 1;
      }
      else if (item.status == ConstanteUtil.ETAT_VALIDER){
        this.statistics.totalValider += 1;
      }
      this.statistics.totalMontant += item.montantTotal || 0;
      this.statistics.totalQuantite += item.quantiteTotal || 0;
    });
  }

  applyFilters():void{
    this.filteredItems = this.items.filter(item => {
      if (this.filters.designation !== "" && !UtilitaireUtil.compareMotCle(item.designation, this.filters.designation)) {
        return false;
      }
      if (this.filters.client !== "" && !UtilitaireUtil.compareMotCle(item.client?.nom+" "+item.client?.prenom, this.filters.client)) {
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
      designation: "",
      client: "",
      montant_min: undefined,
      montant_max: undefined,
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
    this.router.navigate(['boutique/vente/update', item._id]);
  }

  // Supprimer une facture
  async deleteItem(item:any): Promise<void> {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      await this.itemService.deleteMereFille(item._id||"");
      await this.loadItems();
      this.applyFilters();
    }
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
  protected readonly ConstanteUtil = ConstanteUtil;
  protected readonly Vente = Vente;
}
