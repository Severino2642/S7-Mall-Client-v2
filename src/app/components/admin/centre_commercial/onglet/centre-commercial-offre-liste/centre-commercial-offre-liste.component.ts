import {Component, Input} from '@angular/core';
import {OffreDeLocationCPLModel} from "../../../../../models/offre_location.model";
import {
  OffreLocationServiceService
} from "../../../../../services/offre_location.service/offre-location.service.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterConfig {
  label: string;
  options: FilterOption[];
  selected: string;
}

export interface SortOption {
  value: string;
  label: string;
  icon: string;
  category?: string;
}

@Component({
  selector: 'app-centre-commercial-offre-liste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './centre-commercial-offre-liste.component.html',
  styleUrl: './centre-commercial-offre-liste.component.css'
})
export class CentreCommercialOffreListeComponent {
  loading: boolean = false;
  @Input() idCentreCommercial = "";

  livingAreaFilter: FilterConfig = {
    label: 'LIVING AREA (M²)',
    selected: '',
    options: [
      { value: '', label: 'Tous' },
      { value: '0-60', label: 'Moins de 60 m²' },
      { value: '60-80', label: '60 - 80 m²' },
      { value: '80-120', label: '80 - 120 m²' },
      { value: '120-150', label: '120 - 150 m²' },
      { value: '150-200', label: '150 - 200 m²' },
      { value: '200+', label: 'Plus de 200 m²' }
    ]
  };

  // Options de tri
  sortOptions: SortOption[] = [
    { value: 'price-asc', label: 'Price: Low to High', icon: 'fa-check', category: 'Prix' },
    { value: 'price-desc', label: 'Price: High to Low', icon: 'fa-arrow-down', category: 'Prix' },
    { value: 'surface-asc', label: 'Surface: Small to Large', icon: 'fa-expand-arrows-alt', category: 'Surface' },
    { value: 'surface-desc', label: 'Surface: Large to Small', icon: 'fa-compress-arrows-alt', category: 'Surface' },
    { value: 'date-desc', label: 'Newest First', icon: 'fa-calendar', category: 'Date' },
    { value: 'date-asc', label: 'Oldest First', icon: 'fa-history', category: 'Date' }
  ];

  selectedSort = 'price-asc';


  filters: {
    centre_commercial: string;
    surface_min: number | null;
    surface_max: number | null;
    montantLoyer_min: number | null;
    montantLoyer_max: number | null;
    date_min: string | null;  // 👈 Si tu utilises des dates en string
    date_max: string | null;
  } = {
    centre_commercial: "",
    surface_min: null,
    surface_max: null,
    montantLoyer_min: null,
    montantLoyer_max: null,
    date_min: null,
    date_max: null,
  };


  items : OffreDeLocationCPLModel[] = [];
  filteredItems : OffreDeLocationCPLModel[] = [];

  currentPage = 1;
  itemsPerPage = 4;
  totalPages = 1;

  constructor(
    private itemService: OffreLocationServiceService,
    private router : Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.loadItems();
    this.applyFilters();
    this.updatePagination();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
  }

  async loadItems(): Promise<void> {
    this.loading = true;
    var res = await this.itemService.getOffreDisponibleByIdCentreCommercial(this.idCentreCommercial);
    if (res!=null){
      this.items = res;
      console.log("Offres de location chargées :", this.items);
    }
    this.loading = false;
  }

  applyFilters():void{
    this.filteredItems = this.items.filter(item => {
      if (this.filters.centre_commercial !== "" && item.nomCentreCommercial?.toLowerCase().includes(this.filters.centre_commercial?.toLowerCase())) {
        return false;
      }
      let surface = this.calculateSurface(item);
      if ( surface != undefined){
        if (this.filters.surface_min != undefined && surface < this.filters.surface_min) {
          return false;
        }
        if (this.filters.surface_max != undefined && surface > this.filters.surface_max) {
          return false;
        }
      }
      if (item.montantLoyer != undefined){
        if (this.filters.montantLoyer_min != undefined && item.montantLoyer < this.filters.montantLoyer_min) {
          return false;
        }
        if (this.filters.montantLoyer_max != undefined && item.montantLoyer > this.filters.montantLoyer_max) {
          return false;
        }
      }
      return true;
    });
  }
  // Obtenir le label de l'option sélectionnée
  getSelectedLabel(filter: FilterConfig): string {
    const option = filter.options.find(opt => opt.value === filter.selected);
    return option ? option.label : '';
  }

  // Obtenir le label du tri sélectionné
  getSelectedSortLabel(): string {
    const option = this.sortOptions.find(opt => opt.value === this.selectedSort);
    return option ? option.label : 'Price: Low to High';
  }

  // Grouper les options de tri par catégorie
  getSortOptionsByCategory(category: string): SortOption[] {
    return this.sortOptions.filter(opt => opt.category === category);
  }

  // Changer le filtre Living Area
  changeLivingArea(value: string): void {
    if (value === '') {
      this.filters.surface_min = null;
      this.filters.surface_max = null;
      this.livingAreaFilter.selected = '';
      this.applyFilters();
      return;
    }
    this.livingAreaFilter.selected = value;
    this.filters.surface_min = parseInt(value.split('-')[0]);
    this.filters.surface_max = parseInt(value.split('-')[1]);
    this.applyFilters();
  }

  // Changer le tri
  changeSort(value: string): void {
    this.selectedSort = value;
  }

  // Vérifier si un filtre est actif
  isFilterActive(filter: FilterConfig, value: string): boolean {
    return filter.selected === value;
  }

  // Vérifier si un tri est actif
  isSortActive(value: string): boolean {
    return this.selectedSort === value;
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

  calculateSurface(item:OffreDeLocationCPLModel|undefined): number {
    if (!item) return 0;
    return (item.longueurBoxe || 0) * (item.largeurBoxe || 0);
  }

  viewDetails(item: OffreDeLocationCPLModel): void {
    this.router.navigate(['owner/offreLocation/details', item._id]);
  }
}
