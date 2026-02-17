import {Component, Input} from '@angular/core';
import {StockDetailsCPLModel} from "../../../../../../models/stock-details.model";
import {StockService} from "../../../../../../services/stock.service/stock.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {VenteDetailsCPLModel} from "../../../../../../models/vente-details.model";
import {CommonModule} from "@angular/common";
import {VenteService} from "../../../../../../services/vente.service/vente.service";

@Component({
  selector: 'app-vente-filles-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './vente-filles-liste.component.html',
  styleUrl: './vente-filles-liste.component.css'
})
export class VenteFillesListeComponent {
  loading = false;
  errorMessage = '';
  @Input() idMere : any = "";
  // Objet Miova2
  @Input() items : VenteDetailsCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  constructor(
    private itemService: VenteService,
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
    var res = await this.itemService.getFillesByIdMere(this.idMere);
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
