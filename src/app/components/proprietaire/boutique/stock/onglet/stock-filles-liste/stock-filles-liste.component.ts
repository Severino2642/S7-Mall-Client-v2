import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ProduitVarianteModel} from "../../../../../../models/produit-variante.model";
import {ProduitService} from "../../../../../../services/produit.service/produit.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {StockDetailsCPLModel, StockDetailsModel} from "../../../../../../models/stock-details.model";
import {StockService} from "../../../../../../services/stock.service/stock.service";

@Component({
  selector: 'app-stock-filles-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './stock-filles-liste.component.html',
  styleUrl: './stock-filles-liste.component.css'
})
export class StockFillesListeComponent {
  loading = false;
  errorMessage = '';
  @Input() idMere : any = "";
  // Objet Miova2
  @Input() items : StockDetailsCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  constructor(
    private itemService: StockService,
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
    var res = await this.itemService.getStockDetailsByIdMere(this.idMere);
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

}
