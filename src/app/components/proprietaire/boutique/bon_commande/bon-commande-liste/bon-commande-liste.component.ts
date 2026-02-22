import { Component } from '@angular/core';
import {CommandeCPLModel} from "../../../../../models/commande.model";
import {CommandeService} from "../../../../../services/commande.service/commande.service";
import {Router, RouterLink} from "@angular/router";
import {StorageUtil} from "../../../../../utils/storage.util";
import {BonDeCommande, BonDeCommandeCPLModel} from "../../../../../models/bon-de-commande.model";
import {BonDeCommandeService} from "../../../../../services/bon-de-commande.service/bon-de-commande.service";
import {BoutiqueModel} from "../../../../../models/boutique.model";
import {ConstanteUtil} from "../../../../../utils/constante.util";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";
import {CommonModule, DatePipe, NgForOf, NgIf} from "@angular/common";
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-bon-commande-liste',
  standalone: true,
  imports: [
    DatePipe,
    CommonModule,
    HeaderComponent,
    NavbarComponent,
    FormsModule,
    RouterLink
  ],
  templateUrl: './bon-commande-liste.component.html',
  styleUrl: './bon-commande-liste.component.css'
})
export class BonCommandeListeComponent {
  loading = false;
  errorMessage = '';
  // filtres
  filters = {
    client: "",
    montant_min: undefined,
    montant_max: undefined,
    quantite_min: undefined,
    quantite_max: undefined,
    date_min: undefined,
    date_max: undefined,
    status:0
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
  items : BonDeCommandeCPLModel[] = [];
  filteredItems : BonDeCommandeCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private itemService: BonDeCommandeService,
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

      if (this.filters.status != 0 && item.status != this.filters.status) {
        return false;
      }
      return true;
    });

    this.loadStats();
  }

  resetFilters(): void {
    this.filters = {
      client: "",
      montant_min: undefined,
      montant_max: undefined,
      quantite_min: undefined,
      quantite_max: undefined,
      date_min: undefined,
      date_max: undefined,
      status:0
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
  protected readonly BonDeCommande = BonDeCommande;
}
