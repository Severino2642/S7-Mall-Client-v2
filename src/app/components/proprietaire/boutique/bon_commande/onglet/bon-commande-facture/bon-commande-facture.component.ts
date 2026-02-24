import {Component, Input} from '@angular/core';
import {StockCPLModel} from "../../../../../../models/stock.model";
import {StockService} from "../../../../../../services/stock.service/stock.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Vente, VenteCPLModel} from "../../../../../../models/vente.model";
import {VenteService} from "../../../../../../services/vente.service/vente.service";
import {ConstanteUtil} from "../../../../../../utils/constante.util";
import {UtilitaireUtil} from "../../../../../../utils/utilitaire.util";

@Component({
  selector: 'app-bon-commande-facture',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './bon-commande-facture.component.html',
  styleUrl: './bon-commande-facture.component.css'
})
export class BonCommandeFactureComponent {
  loading = false;
  errorMessage = '';
  @Input() idMere : any = "";
  // Objet Miova2
  @Input() items : VenteCPLModel[] = [];

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

  protected readonly ConstanteUtil = ConstanteUtil;
  protected readonly Vente = Vente;
  protected readonly UtilitaireUtil = UtilitaireUtil;
}
