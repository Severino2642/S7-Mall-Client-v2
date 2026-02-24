import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {DemandeLocationCPLModel} from "../../../../../models/demande-location.model";
import {DemandeLocationService} from "../../../../../services/demande_location.service/demande-location.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {StorageUtil} from "../../../../../utils/storage.util";
import {UrlUtil} from "../../../../../utils/url.util";
import { UtilitaireUtil } from '../../../../../utils/utilitaire.util';
import { ConstanteUtil } from '../../../../../utils/constante.util';
import {Boutique, BoutiqueCPLModel} from "../../../../../models/boutique.model";
import {BoutiqueService} from "../../../../../services/boutique.service/boutique.service";
import {HeaderComponent} from "../../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../../admin/navbar.component/navbar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-boutique.liste',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './boutique.liste.component.html',
  styleUrl: './boutique.liste.component.css'
})
export class BoutiqueListeComponent {
  loading = false;
  userRole = '';
  errorMessage = '';
  // filtres
  filters = {
    nom: "",
    boxe: "",
    proprietaire: "",
    centreCommercial: "",
    date_min : undefined,
    date_max : undefined,
    status:0
  };

  // Recapitulation ou Stats
  statistics = {
    totalListe: 0,
    totalOuvert:0,
    totalFermer:0
  };

  status = [
    {val : 0, label : "TOUS"},
    {val : ConstanteUtil.ETAT_DISPONIBLE, label : "OUVERT"},
    {val : ConstanteUtil.ETAT_OCCUPEE, label : "FERMER"}
  ]
  // Objet Miova2
  items : BoutiqueCPLModel[] = [];
  filteredItems : BoutiqueCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private itemService: BoutiqueService,
    private router : Router,
    private route: ActivatedRoute
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
    this.userRole = auth?.role?.val;
    if (auth.role.val === ConstanteUtil.role_centre_commercial){
      var res = await this.itemService.getByIdCentreCommercial(auth?.idUser);
      if (res!=null){
        this.items = res;
      }
    }
    if (auth.role.val === ConstanteUtil.role_proprietaire){
      var res = await this.itemService.getByIdProprietaire(auth?.idUser);
      if (res!=null){
        this.items = res;
      }
    }
    this.loading = false;
  }

  loadStats():void{
    this.statistics.totalListe = this.filteredItems.length;
    this.statistics.totalOuvert = 0;
    this.statistics.totalFermer = 0;
    this.filteredItems.forEach(item=>{
      if (item.status==ConstanteUtil.ETAT_DISPONIBLE) this.statistics.totalOuvert+=1;
      if (item.status==ConstanteUtil.ETAT_OCCUPEE) this.statistics.totalFermer+=1;
    });
  }

  applyFilters():void{
    this.filteredItems = this.items.filter(item => {
      if (this.filters.nom !== "" && !UtilitaireUtil.compareMotCle(item.nom, this.filters.nom)) {
        return false;
      }
      if (this.filters.boxe !== "" && !UtilitaireUtil.compareMotCle(item.boxe?.nom, this.filters.boxe)) {
        return false;
      }
      if (this.filters.proprietaire !== "" && !UtilitaireUtil.compareMotCle(item.proprietaire?.nom, this.filters.proprietaire)) {
        return false;
      }
      if (this.filters.centreCommercial !== "" && !UtilitaireUtil.compareMotCle(item.centreCommercial?.nom, this.filters.centreCommercial)) {
        return false;
      }
      if (this.filters.status != 0 && item.status != this.filters.status) {
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
      return true;
    });

    this.loadStats();
  }

  resetFilters(): void {
    this.filters = {
      boxe: "",
      nom: "",
      centreCommercial: "",
      proprietaire: "",
      date_min : undefined,
      date_max: undefined,
      status: 0
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
    this.router.navigate(['admin/demandeLocation/update', item._id]);
  }

  async ouvrirBoutique(item:BoutiqueCPLModel,index:number) : Promise<void>{
    if (item?._id != null) {
      const updatedItem = await this.itemService.ouvrir(item?._id);
      this.items[index].status = updatedItem?.status;
      this.applyFilters()
    }
  }

  async fermerBoutique(item:BoutiqueCPLModel,index:number) : Promise<void>{
    if (item?._id != null) {
      const updatedItem = await this.itemService.fermer(item?._id);
      this.items[index].status = updatedItem?.status;
      this.applyFilters()
    }
  }

  connectToBoutique(item:BoutiqueCPLModel){
    this.router.navigate(['owner/boutique/details', item._id]);
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
  protected readonly ConstanteUtil = ConstanteUtil;
  protected readonly Boutique = Boutique;
}
