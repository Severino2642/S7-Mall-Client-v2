import {Component, EventEmitter, Output} from '@angular/core';
import {CategorieModel} from "../../../../../models/categorie.model";
import {ProduitCPLModel} from "../../../../../models/produit.model";
import {ProduitService} from "../../../../../services/produit.service/produit.service";
import {CategorieService} from "../../../../../services/categorie.service/categorie.service";
import {Router} from "@angular/router";
import {StorageUtil} from "../../../../../utils/storage.util";
import {BoutiqueModel} from "../../../../../models/boutique.model";
import {ConstanteUtil} from "../../../../../utils/constante.util";
import {CommonModule} from "@angular/common";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";
import {HeaderComponent} from "../../../header.component/header.component";
import {CentreCommercialModel} from "../../../../../models/mall.model";
import {MallService} from "../../../../../services/mall.service/mall.service";
import {BoutiqueService} from "../../../../../services/boutique.service/boutique.service";
import {FormsModule} from "@angular/forms";
import {FooterComponent} from "../../../footer.component/footer.component";
import {filter} from "rxjs/operators";
import {PanierService} from "../../../../../services/panier.service/panier.service";
import {PanierModel} from "../../../../../models/panier.model";

@Component({
  selector: 'app-market-produit-liste',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule, FooterComponent],
  templateUrl: './market-produit-liste.component.html',
  styleUrl: './market-produit-liste.component.css'
})
export class MarketProduitListeComponent {
  loading = false;
  errorMessage = '';
  // filtres
  filters = {
    nom: "",
    categorie: "",
    centre_commercial: "",
    boutique: "",
    prix_min: undefined,
    prix_max: undefined
  };

  categories : CategorieModel[] = [];

  // Objet Miova2
  items : ProduitCPLModel[] = [];
  filteredItems : ProduitCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  formRechercheCentre = {
    "title":"Centre commercial",
    "recherche": "",
    "results" : [] as CentreCommercialModel[],
    "isLoading": false,
    "limit": 5,
    "voirPlus": false
  };

  formRechercheBoutique = {
    "title":"Boutique",
    "recherche": "",
    "results" : [] as BoutiqueModel[],
    "isLoading": false,
    "limit": 5,
    "voirPlus": false
  };

  idClient = "";

  constructor(
    private itemService: ProduitService,
    private categorieService: CategorieService,
    private centreCommercialService: MallService,
    private boutiqueService: BoutiqueService,
    private panierService: PanierService,
    private router : Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    let auth = StorageUtil.getFromStorage<any>("auth");
    if (auth && auth.idUser){
      this.idClient = auth.idUser;
    }
    await this.loadItems();
    await this.loadCategories();
    await this.loadCentreCommercial();
    await this.loadBoutique();
    this.applyFilters();
    this.updatePagination();
  }

  async loadCategories(): Promise<void> {
    var res = await this.categorieService.getAll();
    if (res!=null){
      this.categories = res;
    }
  }

  async loadCentreCommercial(): Promise<void> {
    var res = await this.centreCommercialService.getAll();
    if (res!=null){
      this.formRechercheCentre.results = res;
    }
  }

  async loadBoutique(): Promise<void> {
    var res = await this.boutiqueService.getAll();
    if (res!=null){
      this.formRechercheBoutique.results = res;
    }
  }

  async loadItems(): Promise<void> {
    this.loading = true;
    var res = await this.itemService.getAllForClient();
    if (res!=null){
      this.items = res;
    }
    this.loading = false;
  }


  applyFilters():void{

    this.filteredItems = this.items.filter(item => {
      if (this.filters.nom !== "" && !UtilitaireUtil.compareMotCle(item.nom, this.filters.nom)) {
        return false;
      }
      console.log("item.idCemtreCommercial", item.idCentreCommercial);
      if (this.filters.centre_commercial !== "" && !UtilitaireUtil.compareMotCle(item.idCentreCommercial, this.filters.centre_commercial)) {
        return false;
      }
      if (this.filters.boutique !== "" && item.boutique?._id !== this.filters.boutique) {
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
      return true;
    });

  }

  resetFilters(): void {
    this.filters = {
      nom: "",
      categorie: "",
      centre_commercial: "",
      boutique: "",
      prix_min: undefined,
      prix_max: undefined
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

  // Catégorie active
  activeCategory: string = '';

  // Sélectionner une catégorie
  selectCategory(categoryId: string): void {
    this.activeCategory = categoryId;
    console.log('Catégorie sélectionnée:', categoryId);
    this.filters.categorie = categoryId;
    this.applyFilters();
  }

  // Scroll vers la gauche
  scrollLeft(): void {
    const container = document.querySelector('.categories-scroll');
    if (container) {
      container.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    }
  }

  // Scroll vers la droite
  scrollRight(): void {
    const container = document.querySelector('.categories-scroll');
    if (container) {
      container.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    }
  }

  // Vérifier si une catégorie est active
  isActive(categoryId: string): boolean {
    return this.activeCategory === categoryId;
  }

  getResultForRechercheCentre(): CentreCommercialModel[] {
    let filteredResults = this.formRechercheCentre.results;
    if (this.formRechercheCentre.recherche != "") {
      filteredResults = this.formRechercheCentre.results.filter(c => UtilitaireUtil.compareMotCle(c.nom||"", this.formRechercheCentre.recherche));
    }
    if (!this.formRechercheCentre.voirPlus) {
      filteredResults = filteredResults.slice(0, this.formRechercheCentre.limit);
    }
    return filteredResults;
  }

  getResultForRechercheBoutique(): BoutiqueModel[] {
    let filteredResults = this.formRechercheBoutique.results;
    if (this.formRechercheBoutique.recherche != "") {
      filteredResults = this.formRechercheBoutique.results.filter(c => UtilitaireUtil.compareMotCle(c.nom||"", this.formRechercheBoutique.recherche));
    }
    if (!this.formRechercheBoutique.voirPlus) {
      filteredResults = filteredResults.slice(0, this.formRechercheBoutique.limit);
    }
    return filteredResults;
  }

  changeBoolean(boolItem:boolean){
    if (boolItem){
      boolItem = false;
    }
    else {
      boolItem = true;
    }
    return boolItem;
  }

  goToDetails(id:string|undefined): void {
    if (id){
      this.router.navigate(['/client/market/produit/details', id]);
    }
  }

  async addToCart(item: ProduitCPLModel): Promise<void> {
    this.loading = true;
    const panier : PanierModel = {
      idClient: this.idClient,
      idProduit: item._id,
      quantite: 1
    };
    await this.panierService.create(panier);
    let itemInCartCount = StorageUtil.getFromStorage<any>("cartItemsCount") || 0;
    itemInCartCount++;
    StorageUtil.setToStorage("cartItemsCount", itemInCartCount);
    alert("Produit ajouté au panier !");
    this.loading = false;
  }
}
