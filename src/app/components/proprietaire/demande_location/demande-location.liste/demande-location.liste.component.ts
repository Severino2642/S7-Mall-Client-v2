import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {OffreDeLocationCPLModel} from "../../../../models/offre_location.model";
import {OffreLocationServiceService} from "../../../../services/offre_location.service/offre-location.service.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import { UtilitaireUtil } from '../../../../utils/utilitaire.util';
import {DemandeLocation, DemandeLocationCPLModel} from "../../../../models/demande-location.model";
import {DemandeLocationService} from "../../../../services/demande_location.service/demande-location.service";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UrlUtil} from "../../../../utils/url.util";

@Component({
  selector: 'app-demande-location.liste',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './demande-location.liste.component.html',
  styleUrl: './demande-location.liste.component.css'
})
export class DemandeLocationListeComponent {
  loading = false;
  userRole = '';
  errorMessage = '';
  // filtres
  filters = {
    idOffreLocation: "",
    boxe: "",
    montantLoyer_min: undefined,
    montantLoyer_max: undefined,
    date_min : undefined,
    date_max : undefined,
    status:0
  };

  // Recapitulation ou Stats
  statistics = {
    totalListe: 0,
    totalAccepter:0,
    totalRejeter:0,
    totalEnAttente:0
  };

  status = [
    {val : 0, label : "TOUS"},
    {val : ConstanteUtil.ETAT_VALIDER, label : "ACCEPTEE"},
    {val : ConstanteUtil.ETAT_EN_ATTENTE, label : "EN ATTENTE"},
    {val : ConstanteUtil.ETAT_REJETER, label : "REJETEE"},
  ]
  // Objet Miova2
  items : DemandeLocationCPLModel[] = [];
  filteredItems : DemandeLocationCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private itemService: DemandeLocationService,
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
    this.statistics.totalAccepter = 0;
    this.statistics.totalRejeter = 0;
    this.statistics.totalEnAttente = 0;
    this.filteredItems.forEach(item=>{
      if (item.status==ConstanteUtil.ETAT_VALIDER) this.statistics.totalAccepter+=1;
      if (item.status==ConstanteUtil.ETAT_REJETER) this.statistics.totalRejeter+=1;
      if (item.status==ConstanteUtil.ETAT_EN_ATTENTE) this.statistics.totalEnAttente+=1;
    });
  }

  applyFilters():void{
    this.filteredItems = this.items.filter(item => {
      if (this.filters.boxe !== "" && !UtilitaireUtil.compareMotCle(item.boxe?.nom, this.filters.boxe)) {
        return false;
      }
      if (this.filters.idOffreLocation !== "" && !UtilitaireUtil.compareMotCle(item.offre?._id, this.filters.idOffreLocation)) {
        return false;
      }
      if (this.filters.status != 0 && item.status != this.filters.status) {
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
      idOffreLocation: "",
      boxe: "",
      montantLoyer_min: undefined,
      montantLoyer_max: undefined,
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

  async accepterDemande(item:DemandeLocationCPLModel,index:number) : Promise<void>{
    if (item?._id != null) {
      const updatedItem = await this.itemService.accepter(item?._id);
      this.items[index].status = ConstanteUtil.ETAT_VALIDER;
      this.router.navigate(['owner/location_boxe/details',updatedItem.idLocation]);
    }
  }

  async rejeterDemande(item:DemandeLocationCPLModel,index:number) : Promise<void>{
    if (item?._id != null) {
      const updatedItem = await this.itemService.rejeter(item?._id);
      this.items[index].status = ConstanteUtil.ETAT_REJETER;
      this.applyFilters()
    }
  }

  goToOffre(idOffreLocation:any){
    if (this.userRole===ConstanteUtil.role_centre_commercial){
      this.router.navigate(['admin/offreLocation/details',idOffreLocation])
    }
    if (this.userRole===ConstanteUtil.role_proprietaire){
      this.router.navigate(['owner/offreLocation/details',idOffreLocation])
    }
  }

  // Supprimer une facture
  async deleteItem(item:any): Promise<void> {
    console.log('Delete invoice:', item._id);
    await this.itemService.delete(item._id);
    UrlUtil.refreshCurrentRoute(this.route,this.router)
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
  protected readonly ConstanteUtil = ConstanteUtil;
  protected readonly DemandeLocation = DemandeLocation;
}
