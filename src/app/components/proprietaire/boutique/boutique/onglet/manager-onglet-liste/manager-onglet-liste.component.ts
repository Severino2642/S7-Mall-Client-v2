import {Component, Input} from '@angular/core';
import {VenteCPLModel} from "../../../../../../models/vente.model";
import {VenteService} from "../../../../../../services/vente.service/vente.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {Manager, ManagerCPLModel} from "../../../../../../models/manager.model";
import {ManagerService} from "../../../../../../services/manager.service/manager.service";

@Component({
  selector: 'app-manager-onglet-liste',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './manager-onglet-liste.component.html',
  styleUrl: './manager-onglet-liste.component.css'
})
export class ManagerOngletListeComponent {
  loading = false;
  errorMessage = '';
  @Input() idMere : any = "";
  // Objet Miova2
  @Input() items : ManagerCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  constructor(
    private itemService: ManagerService,
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

  protected readonly Manager = Manager;
}
