import {Component, Input} from '@angular/core';
import {CommandeDetailsCPLModel} from "../../../../../../models/commande-details.model";
import {CommandeService} from "../../../../../../services/commande.service/commande.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {BonDeCommandeDetailsCPLModel} from "../../../../../../models/bon-de-commande-details.model";
import {BonDeCommandeService} from "../../../../../../services/bon-de-commande.service/bon-de-commande.service";
import {UtilitaireUtil} from "../../../../../../utils/utilitaire.util";

@Component({
  selector: 'app-bon-commande-filles-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bon-commande-filles-liste.component.html',
  styleUrl: './bon-commande-filles-liste.component.css'
})
export class BonCommandeFillesListeComponent {
  loading = false;
  errorMessage = '';
  @Input() idMere : any = "";
  // Objet Miova2
  @Input() items : BonDeCommandeDetailsCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  @Input() urlBase = "/client/market/produit/details";
  constructor(
    private itemService: BonDeCommandeService,
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
    console.log("id mere", this.idMere);
    var res = await this.itemService.getFillesByIdMere(this.idMere);
    console.log("res filles", res);
    if(res){
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

  protected readonly UtilitaireUtil = UtilitaireUtil;
}
