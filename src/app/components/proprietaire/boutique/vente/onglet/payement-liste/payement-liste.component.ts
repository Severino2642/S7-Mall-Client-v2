import {Component, Input} from '@angular/core';
import {
  MouvementCaisse,
  MouvementCaisseCPLModel,
  MouvementCaisseModel
} from "../../../../../../models/mouvement-caisse.model";
import {MouvementCaisseService} from "../../../../../../services/mouvement_caisse.service/mouvement-caisse.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UtilitaireUtil} from "../../../../../../utils/utilitaire.util";

@Component({
  selector: 'app-payement-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payement-liste.component.html',
  styleUrl: './payement-liste.component.css'
})
export class PayementListeComponent {
  loading = false;
  errorMessage = '';
  @Input() idMere : any = "";
  // Objet Miova2
  @Input() items : MouvementCaisseCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  constructor(
    private itemService: MouvementCaisseService,
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

  protected readonly UtilitaireUtil = UtilitaireUtil;
  protected readonly MouvementCaisse = MouvementCaisse;
}
