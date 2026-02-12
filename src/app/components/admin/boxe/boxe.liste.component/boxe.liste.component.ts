import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from '../../navbar.component/navbar.component';
import {FormsModule} from '@angular/forms';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {Boxe, BoxeModel} from '../../../../models/boxe.model';
import {BoxeService} from '../../../../services/boxe.service/boxe.service';
import {StorageUtil} from '../../../../utils/storage.util';
import {HeaderComponent} from '../../header.component/header.component';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-boxe.liste.component',
  imports: [NavbarComponent, FormsModule, NgForOf, NgIf, NgClass, HeaderComponent, RouterLink],
  templateUrl: './boxe.liste.component.html',
  styleUrl: './boxe.liste.component.css',
  standalone: true
})
export class BoxeListeComponent implements OnInit{
  loading = false;
  errorMessage = '';
  // filtres
  filters = {
    nom: "",
    status: 0
  };

  status = [
    {val : 0, label : "TOUS"},
    {val : 1, label : "DISPONIBLE"},
    {val : 2, label : "EN ATTENTE"},
    {val : 3, label : "OCCUPEE"},
  ]

  // Recapitulation ou Stats
  statistics = {
    totalListe: 0,
    totalBoxeDisponible: 0,
    totalBoxeOccupee: 0,
    totalBoxeEnAttente: 0
  };

  // Objet Miova2
  items : BoxeModel[] = [];
  filteredItems : BoxeModel[] = [];

  // Onglets
  activeTab: string = 'all';
  tabs = [
    // { id: 'all', label: 'Toutes', count: 0 },
    // { id: 'overdue', label: 'En retard', count: 0 }
  ];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(
    private boxeService: BoxeService,
    private router : Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadItems();
    this.applyFilters();
    this.loadStats();
    this.updateTabCounts();
  }


  async loadItems(): Promise<void> {
    this.loading = true;
    var auth = StorageUtil.getFromStorage<any>("auth");
    var res = await this.boxeService.getByIdCentreCommercial(auth?.idUser);
    if (res!=null){
      this.items = res;
      console.log("list items 1: ",res);
    }
    this.loading = false;
  }

  loadStats():void{
    this.statistics.totalListe = this.filteredItems.length;
    this.statistics.totalBoxeDisponible = 0;
    this.statistics.totalBoxeEnAttente = 0;
    this.statistics.totalBoxeOccupee = 0;
    this.filteredItems.forEach(item=>{
      if (item.status==1){
        this.statistics.totalBoxeDisponible += 1;
      }
      if (item.status==2){
        this.statistics.totalBoxeEnAttente += 1;
      }
      if (item.status==3){
        this.statistics.totalBoxeOccupee += 1;
      }
    })
  }

  applyFilters():void{
    this.filteredItems = this.items.filter(item => {
      if (this.filters.nom !== "" && item.nom !== this.filters.nom) {
        console.log("diso nom");
        return false;
      }
      if (this.filters.status != 0 && item.status != this.filters.status) {
        console.log("diso status ",item.status,this.filters.status);
        return false;
      }
      return true;
    });

    this.loadStats();
  }

  resetFilters(): void {
    this.filters = {
      nom: "",
      status: 0
    };
    this.applyFilters();
  }

  changeTab(tabId: string): void {
    this.activeTab = tabId;
    this.currentPage = 1;
    this.applyFilters();
  }

  updateTabCounts(): void {
    // this.tabs[0].count = this.items.length;
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
    console.log('Edit item:', item._id);
    this.router.navigate(['admin/boxe/update', item._id]);
  }

  // Supprimer une facture
  deleteItem(item:any): void {
    console.log('Delete invoice:', item.id);
    // Implémenter la logique de suppression
  }

  formatAmount(amount: number): string {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  formatTaille(longueur: any, largeur: any):string{
    return `${longueur} x ${largeur} m`;
  }

  protected readonly Boxe = Boxe;
}
