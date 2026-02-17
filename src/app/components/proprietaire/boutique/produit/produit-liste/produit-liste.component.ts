import { Component } from '@angular/core';
import {OffreDeLocationCPLModel} from "../../../../../models/offre_location.model";
import {
  OffreLocationServiceService
} from "../../../../../services/offre_location.service/offre-location.service.service";
import {Router, RouterLink} from "@angular/router";
import {StorageUtil} from "../../../../../utils/storage.util";
import {CommonModule} from "@angular/common";
import {Produit, ProduitCPLModel} from "../../../../../models/produit.model";
import {ProduitService} from "../../../../../services/produit.service/produit.service";
import {BoutiqueModel} from "../../../../../models/boutique.model";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";
import {CategorieModel} from "../../../../../models/categorie.model";
import {CategorieService} from "../../../../../services/categorie.service/categorie.service";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";
import {ConstanteUtil} from "../../../../../utils/constante.util";
import {Boxe} from "../../../../../models/boxe.model";

@Component({
  selector: 'app-produit-liste',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, NavbarComponent, RouterLink],
  templateUrl: './produit-liste.component.html',
  styleUrl: './produit-liste.component.css'
})
export class ProduitListeComponent {
  loading = false;
  errorMessage = '';
  // filtres
  filters = {
    nom: "",
    categorie: "",
    prix_min: undefined,
    prix_max: undefined,
    quantite_min: undefined,
    quantite_max: undefined,
    status: 0,
  };

  status = [
    {val : 0, label : "TOUS"},
    {val : 1, label : "DISPONIBLE"},
    {val : 3, label : "INDISPONIBLE"}
  ];

  categories : CategorieModel[] = [];

  // Recapitulation ou Stats
  statistics = {
    totalListe: 0,
    totalDisponible:0,
    totalIndisponible:0,
    totalQuantite:0
  };

  // Objet Miova2
  items : ProduitCPLModel[] = [];
  filteredItems : ProduitCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private itemService: ProduitService,
    private categorieService: CategorieService,
    private router : Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadItems();
    await this.loadCategories();
    this.applyFilters();
    this.loadStats();
    this.updatePagination();
  }

  async loadCategories(): Promise<void> {
    var res = await this.categorieService.getAll();
    if (res!=null){
      this.categories = res;
    }
  }

  async loadItems(): Promise<void> {
    this.loading = true;
    var boutique = StorageUtil.getFromStorage<BoutiqueModel>("boutique");
    var res = await this.itemService.getCPLByIdBoutique(boutique?._id||"","");
    if (res!=null){
      this.items = res;
    }
    this.loading = false;
  }

  loadStats():void{
    this.statistics.totalListe = this.filteredItems.length;
    this.statistics.totalIndisponible = 0;
    this.statistics.totalDisponible = 0;
    this.statistics.totalQuantite = 0;
    this.filteredItems.forEach(item => {
      if (item.status == ConstanteUtil.ETAT_DISPONIBLE){
        this.statistics.totalDisponible += 1;
      }
      else if (item.status == ConstanteUtil.ETAT_OCCUPEE){
        this.statistics.totalIndisponible += 1;
      }
      if (item.quantite != undefined){
        this.statistics.totalQuantite += item.quantite;
      }
    });
  }

  applyFilters():void{
    this.filteredItems = this.items.filter(item => {
      if (this.filters.nom !== "" && !UtilitaireUtil.compareMotCle(item.nom, this.filters.nom)) {
        return false;
      }
      if (this.filters.categorie !== "" && item.idCategorie !== this.filters.categorie) {
        return false;
      }
      if (item.prix != undefined){
        if (this.filters.prix_min != undefined && item.prix < this.filters.prix_min) {
          return false;
        }
        if (this.filters.prix_max != undefined && item.prix > this.filters.prix_max) {
          return false;
        }
      }
      if (item.quantite != undefined){
        if (this.filters.quantite_min != undefined && item.quantite < this.filters.quantite_min) {
          return false;
        }
        if (this.filters.quantite_max != undefined && item.quantite > this.filters.quantite_max) {
          return false;
        }
      }
      if (this.filters.status != 0 && item.status != this.filters.status) {
        return false;
      }
      if (this.filters.categorie != "" && item.idCategorie != this.filters.categorie) {
        return false;
      }
      return true;
    });

    this.loadStats();
  }

  resetFilters(): void {
    this.filters = {
      nom: "",
      categorie: "",
      prix_min: undefined,
      prix_max: undefined,
      quantite_min: undefined,
      quantite_max: undefined,
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
    this.router.navigate(['boutique/produit/update', item._id]);
  }

  // Supprimer une facture
  async deleteItem(item:any): Promise<void> {

  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
  protected readonly Boxe = Boxe;
  protected readonly Produit = Produit;
}
