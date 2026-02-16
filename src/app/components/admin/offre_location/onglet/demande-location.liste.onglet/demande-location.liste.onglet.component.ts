import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {OffreDeLocationCPLModel} from "../../../../../models/offre_location.model";
import {
  OffreLocationServiceService
} from "../../../../../services/offre_location.service/offre-location.service.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {UrlUtil} from "../../../../../utils/url.util";
import { UtilitaireUtil } from '../../../../../utils/utilitaire.util';
import {DemandeLocation, DemandeLocationCPLModel} from "../../../../../models/demande-location.model";
import {DemandeLocationService} from "../../../../../services/demande_location.service/demande-location.service";
import {ConstanteUtil} from "../../../../../utils/constante.util";

@Component({
  selector: 'app-demande-location-liste-onglet',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './demande-location.liste.onglet.component.html',
  styleUrl: './demande-location.liste.onglet.component.css'
})
export class DemandeLocationListeOngletComponent {
  loading = false;
  errorMessage = '';
  @Input() idMere : any = "";
  // Objet Miova2
  items : DemandeLocationCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  constructor(
    private itemService: DemandeLocationService,
    private router : Router,
    private route : ActivatedRoute
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadItems();
    this.updatePagination();
  }

  async loadItems(): Promise<void> {
    this.loading = true;
    var res = await this.itemService.getByIdOffre(this.idMere);
    if (res!=null){
      this.items = res;
    }
    this.loading = false;
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
  }

  getPaginatedItems(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.items.slice(startIndex, endIndex);
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


  // editItem(item:any): void {
  //   console.log('Edit item:', item._id);
  //   this.router.navigate(['admin/offreLocation/update', item._id]);
  // }

  // Supprimer une facture
  // async deleteItem(item:any): Promise<void> {
  //   console.log('Delete invoice:', item._id);
  //   await this.itemService.delete(item._id);
  //   console.log('After Delete invoice:', item._id);
  //   await UrlUtil.refreshCurrentRoute(this.route,this.router);
  // }

  async accepterDemande(item:DemandeLocationCPLModel,index:number) : Promise<void>{
    if (item?._id != null) {
      const updatedItem = await this.itemService.accepter(item?._id);
      this.items[index].status = ConstanteUtil.ETAT_VALIDER;
    }
  }

  async rejeterDemande(item:DemandeLocationCPLModel,index:number) : Promise<void>{
    if (item?._id != null) {
      const updatedItem = await this.itemService.rejeter(item?._id);
      this.items[index].status = ConstanteUtil.ETAT_REJETER;
    }
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
  protected readonly DemandeLocation = DemandeLocation;
  protected readonly ConstanteUtil = ConstanteUtil;
}
