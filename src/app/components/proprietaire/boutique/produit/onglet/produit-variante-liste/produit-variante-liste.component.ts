import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {OffreDeLocationCPLModel} from "../../../../../../models/offre_location.model";
import {
  OffreLocationServiceService
} from "../../../../../../services/offre_location.service/offre-location.service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UrlUtil} from "../../../../../../utils/url.util";
import {ProduitVarianteModel} from "../../../../../../models/produit-variante.model";
import {ProduitService} from "../../../../../../services/produit.service/produit.service";

@Component({
  selector: 'app-produit-variante-liste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produit-variante-liste.component.html',
  styleUrl: './produit-variante-liste.component.css'
})
export class ProduitVarianteListeComponent {
  loading = false;
  errorMessage = '';
  @Input() idMere : any = "";
  // Objet Miova2
  @Input() items : ProduitVarianteModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  constructor(
    private itemService: ProduitService,
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
