import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ManagerCPLModel} from "../../../../../../models/manager.model";
import {ManagerService} from "../../../../../../services/manager.service/manager.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PaymentLoyer, PaymentLoyerCPLModel} from "../../../../../../models/payment-loyer.model";
import {PaymentLoyerService} from "../../../../../../services/payment_loyer.service/payment-loyer.service";
import {ConstanteUtil} from "../../../../../../utils/constante.util";
import {UtilitaireUtil} from "../../../../../../utils/utilitaire.util";

@Component({
  selector: 'app-payment-loyer-onglet-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-loyer-onglet-liste.component.html',
  styleUrl: './payment-loyer-onglet-liste.component.css'
})
export class PaymentLoyerOngletListeComponent {
  loading = false;
  errorMessage = '';
  @Input() idMere : any = "";
  // Objet Miova2
  @Input() items : PaymentLoyerCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  constructor(
    private itemService: PaymentLoyerService,
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
    var res = await this.itemService.getByIdBoutique(this.idMere);
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
  protected readonly PaymentLoyer = PaymentLoyer;
  protected readonly UtilitaireUtil = UtilitaireUtil;
}
