import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {VenteDetailsCPLModel} from "../../../../../../models/vente-details.model";
import {VenteService} from "../../../../../../services/vente.service/vente.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Stock, StockCPLModel} from "../../../../../../models/stock.model";
import {StockService} from "../../../../../../services/stock.service/stock.service";
import {UtilitaireUtil} from "../../../../../../utils/utilitaire.util";

@Component({
  selector: 'app-stock-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './stock-liste.component.html',
  styleUrl: './stock-liste.component.css'
})
export class StockListeComponent {
  loading = false;
  errorMessage = '';
  @Input() idMere : any = "";
  // Objet Miova2
  @Input() items : StockCPLModel[] = [];

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
    var res = await this.itemService.getCPLByIdSource(this.idMere);
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

  calculerQuantiteTotale(item: StockCPLModel): number {
    if (!item || !item.filles) {
      return 0;
    }
    return item.filles.reduce((total, fille) => total + (fille.entree || 0)+(fille.sortie || 0), 0);
  }

  protected readonly Stock = Stock;
  protected readonly UtilitaireUtil = UtilitaireUtil;
}
