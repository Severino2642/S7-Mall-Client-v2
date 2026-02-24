import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {CaisseModel} from "../../../../models/caisse.model";
import {MouvementCaisseCPLModel} from "../../../../models/mouvement-caisse.model";
import {MouvementCaisseService} from "../../../../services/mouvement_caisse.service/mouvement-caisse.service";
import {CaisseService} from "../../../../services/caisse.service/caisse.service";
import {Router, RouterLink} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {BoutiqueCPLModel, BoutiqueModel} from "../../../../models/boutique.model";
import {Manager, ManagerCPLModel} from "../../../../models/manager.model";
import {ManagerService} from "../../../../services/manager.service/manager.service";
import {BoutiqueService} from "../../../../services/boutique.service/boutique.service";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-manager-liste',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NavbarComponent, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './manager-liste.component.html',
  styleUrl: './manager-liste.component.css'
})
export class ManagerListeComponent {
  loading = false;
  errorMessage = '';
  // filtres
  filters = {
    nom: "",
    boutique: "",
    email: "",
    contact: "",
    status: 0,
  };

  status = [
    {val : 0, label : "TOUS"},
    {val : 1, label : "ACTIF"},
    {val : 3, label : "BLOQUE"}
  ];

  listBoutique: BoutiqueCPLModel[] = [];


  // Recapitulation ou Stats
  statistics = {
    totalListe: 0,
    totalActif:0,
    totalBloquer:0
  };

  // Objet Miova2
  items : ManagerCPLModel[] = [];
  filteredItems : ManagerCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private itemService: ManagerService,
    private boutiqueService: BoutiqueService,
    private router : Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadItems();
    await this.loadListeBoutique();
    this.applyFilters();
    this.loadStats();
    this.updatePagination();
  }

  async loadItems(): Promise<void> {
    this.loading = true;
    const auth = StorageUtil.getFromStorage<any>("auth");
    var res = await this.itemService.getByIdProprietaire(auth.idUser);
    if (res!=null){
      this.items = res;
    }
    this.loading = false;
  }

  async loadListeBoutique(): Promise<void> {
    this.loading = true;
    const auth = StorageUtil.getFromStorage<any>("auth");
    var res = await this.boutiqueService.getByIdProprietaire(auth.idUser);
    if (res!=null){
      this.listBoutique = res;
    }
    this.loading = false;
  }
  loadStats():void{
    this.statistics.totalListe = this.filteredItems.length;
    this.statistics.totalActif = 0;
    this.statistics.totalBloquer = 0;
    this.filteredItems.forEach(item => {
      if (item.status == 1){
        this.statistics.totalActif += 1;
      }else if (item.status == 3){
        this.statistics.totalBloquer += 1;
      }
    });
  }

  applyFilters():void{
    this.filteredItems = this.items.filter(item => {
      if (this.filters.nom !== "" && !UtilitaireUtil.compareMotCle(item.nom+" "+item.prenom, this.filters.nom)) {
        return false;
      }
      if (this.filters.email !== "" && !UtilitaireUtil.compareMotCle(item.email, this.filters.email)) {
        return false;
      }
      if (this.filters.contact !== "" && !UtilitaireUtil.compareMotCle(item.contact, this.filters.contact)) {
        return false;
      }
      if (this.filters.boutique !== "" && item.idBoutique !== this.filters.boutique) {
        return false;
      }
      if (this.filters.status != 0 && item.status != this.filters.status) {
        return false;
      }
      return true;
    });

    this.loadStats();
  }

  resetFilters(): void {
    this.filters = {
      nom: "",
      boutique: "",
      email: "",
      contact: "",
      status: 0,
    };
    this.applyFilters();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredItems.length / this.itemsPerPage);
  }

  getPaginatedItems(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredItems.slice(startIndex, endIndex);
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


  editItem(item:any): void {
    this.router.navigate(['owner/manager/update', item._id]);
  }

  // Supprimer une facture
  async deleteItem(item:any): Promise<void> {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      await this.itemService.delete(item._id||"");
      await this.loadItems();
      this.applyFilters();
    }
  }

  protected readonly UtilitaireUtil = UtilitaireUtil;
  protected readonly Manager = Manager;
}
