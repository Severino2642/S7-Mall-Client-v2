import { Component } from '@angular/core';
import {StockCPLModel} from "../../../../models/stock.model";
import {StockService} from "../../../../services/stock.service/stock.service";
import {Router, RouterLink} from "@angular/router";
import {StorageUtil} from "../../../../utils/storage.util";
import {BoutiqueModel} from "../../../../models/boutique.model";
import {CaisseModel} from "../../../../models/caisse.model";
import {MouvementCaisse, MouvementCaisseCPLModel} from "../../../../models/mouvement-caisse.model";
import {MouvementCaisseService} from "../../../../services/mouvement_caisse.service/mouvement-caisse.service";
import {CaisseService} from "../../../../services/caisse.service/caisse.service";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";
import {CommonModule, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../../../admin/header.component/header.component";
import {NavbarComponent} from "../../../admin/navbar.component/navbar.component";
import {ConstanteUtil} from "../../../../utils/constante.util";

@Component({
  selector: 'app-mouvement-caisse-liste',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    CommonModule,
    HeaderComponent,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './mouvement-caisse-liste.component.html',
  styleUrl: './mouvement-caisse-liste.component.css'
})
export class MouvementCaisseListeComponent {
  loading = false;
  errorMessage = '';
  // filtres
  filters = {
    designation: "",
    caisse: "",
    date_min: undefined,
    date_max: undefined,
    status: 0,
  };

  status = [
    {val : 0, label : "TOUS"},
    {val : 1, label : "EN ATTENTE"},
    {val : 11, label : "VALIDEE"}
  ];

  listCaisse: CaisseModel[] = [];
  idProprietaire = "";


  // Recapitulation ou Stats
  statistics = {
    totalListe: 0,
    totalDebit:0,
    totalCredit:0
  };

  // Objet Miova2
  items : MouvementCaisseCPLModel[] = [];
  filteredItems : MouvementCaisseCPLModel[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private itemService: MouvementCaisseService,
    private caisseService: CaisseService,
    private router : Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    const boutique = StorageUtil.getFromStorage<BoutiqueModel>("boutique");
    var auth = StorageUtil.getFromStorage<any>("auth");
    if (boutique){
      this.idProprietaire = boutique._id || "";
    }else {
      this.idProprietaire = auth?.idUser || "";
    }
    await this.loadItems();
    await this.loadListeCaisse();
    this.applyFilters();
    this.loadStats();
    this.updatePagination();
  }

  async loadItems(): Promise<void> {
    this.loading = true;
    var res = await this.itemService.getAllCPLByIdProprietaire(this.idProprietaire);
    if (res!=null){
      this.items = res;
    }
    this.loading = false;
  }
  async loadListeCaisse(): Promise<void> {
    this.loading = true;
    var res = await this.caisseService.getAllByidProprietaire(this.idProprietaire);
    if (res!=null){
      this.listCaisse = res;
    }
    this.loading = false;
  }
  loadStats():void{
    this.statistics.totalListe = this.filteredItems.length;
    this.statistics.totalCredit = 0;
    this.statistics.totalDebit = 0;
    this.filteredItems.forEach(item => {
      this.statistics.totalCredit += item.credit || 0;
      this.statistics.totalDebit += item.debit || 0;
    });
  }

  applyFilters():void{
    this.filteredItems = this.items.filter(item => {
      if (this.filters.designation !== "" && !UtilitaireUtil.compareMotCle(item.designation, this.filters.designation)) {
        return false;
      }
      if (this.filters.caisse !== "" && item.idCaisse !== this.filters.caisse) {
        return false;
      }
      if (item.date != undefined) {
        if (this.filters.date_min != undefined && new Date(item.date).getTime() < new Date(this.filters.date_min).getTime()) {
          return false;
        }
        if (this.filters.date_max != undefined && new Date(item.date).getTime() > new Date(this.filters.date_max).getTime()) {
          return false;
        }
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
      designation: "",
      caisse: "",
      date_min: undefined,
      date_max: undefined,
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
    this.router.navigate(['caisse/mouvement/update', item._id]);
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
  protected readonly MouvementCaisse = MouvementCaisse;
  protected readonly ConstanteUtil = ConstanteUtil;
}
