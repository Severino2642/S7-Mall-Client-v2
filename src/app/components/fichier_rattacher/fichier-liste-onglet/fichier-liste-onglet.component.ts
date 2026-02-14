import {Component, Input} from '@angular/core';
import {OffreDeLocationCPLModel} from "../../../models/offre_location.model";
import {OffreLocationServiceService} from "../../../services/offre_location.service/offre-location.service.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FileModelCPL} from "../../../models/file.model";
import {FileService} from "../../../services/file.service/file.service";
import {UrlUtil} from "../../../utils/url.util";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-fichier-liste-onglet',
  standalone: true,
  imports: [
    DatePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './fichier-liste-onglet.component.html',
  styleUrl: './fichier-liste-onglet.component.css'
})
export class FichierListeOngletComponent {
  loading = false;
  errorMessage = '';
  @Input() idMere : any = "";
  // Objet Miova2
  items : FileModelCPL[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  constructor(
    private itemService: FileService,
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
    var res = await this.itemService.getByProprietaireAndType(this.idMere,null);
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
  async deleteItem(item:any): Promise<void> {
    console.log('Delete invoice:', item._id);
    await this.itemService.delete(item._id);
    console.log('After Delete invoice:', item._id);
    await UrlUtil.refreshCurrentRoute(this.route,this.router);
  }

  downloadImage(url: string | undefined, filename: any): void {
    if (!url) {
      console.error('URL de l\'image manquante');
      return;
    }
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  }
}
