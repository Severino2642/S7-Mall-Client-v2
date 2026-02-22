import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {BoutiqueCPLModel} from "../../../../../models/boutique.model";
import {BoutiqueService} from "../../../../../services/boutique.service/boutique.service";
import {ConstanteUtil} from "../../../../../utils/constante.util";
import {StorageUtil} from "../../../../../utils/storage.util";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";

@Component({
  selector: 'app-centre-commercial-boutique-liste',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './centre-commercial-boutique-liste.component.html',
  styleUrl: './centre-commercial-boutique-liste.component.css'
})
export class CentreCommercialBoutiqueListeComponent {
  @Input() idCentreCommercial?: string;
  stores: BoutiqueCPLModel[] = [];
  filteredStores: BoutiqueCPLModel[] = [];

  // Filtres
  searchQuery = '';
  sortBy = 'followers';
  showOnlyOpen = false;

  // Options de tri
  sortOptions = [
    { value: 'followers', label: 'Most Popular' },
    { value: 'name', label: 'Name (A-Z)' }
  ];

  userRole = "";
  constructor(
    private router: Router,
    private boutiqueService: BoutiqueService
  ) {}

  async ngOnInit(): Promise<void> {
    const auth = StorageUtil.getFromStorage<any>("auth");
    if (auth) {
      this.userRole = auth.role.val;
    }
    await this.loadStores();
  }

  async loadStores(): Promise<void> {
    if (!this.idCentreCommercial) return;
    let res = await this.boutiqueService.getByIdCentreCommercial(this.idCentreCommercial);
    if (res) {
      this.stores = res;
    }
    this.applyFilters();
  }

  // Appliquer les filtres
  applyFilters(): void {
    let filtered = [...this.stores];

    // Filtre par recherche
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(store =>
        (store.nom && store.nom.toLowerCase().includes(query)) || (store.description && store.description.toLowerCase().includes(query))
      );
    }

    // Filtre ouvert uniquement
    if (this.showOnlyOpen) {
      filtered = filtered.filter(store => store.status === ConstanteUtil.ETAT_DISPONIBLE);
    }

    // Tri
    this.sortStores(filtered);

    this.filteredStores = filtered;
  }

  // Trier les magasins
  sortStores(stores: BoutiqueCPLModel[]): void {
    switch (this.sortBy) {
      case 'followers':
        // @ts-ignore
        stores.sort((a, b) => b.followers?.length - a.followers?.length);
        break;
      case 'name':
        // @ts-ignore
        stores.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
    }
  }

  // Recherche
  onSearch(): void {
    this.applyFilters();
  }

  // Toggle follow
  toggleFollow(store: BoutiqueCPLModel): void {
    // store.isFollowing = !store.isFollowing;
    // if (store.isFollowing) {
    //   store.followers++;
    // } else {
    //   store.followers--;
    // }
  }

  // Aller à la page du magasin
  viewStore(storeId: any): void {
    if (this.userRole!==ConstanteUtil.role_proprietaire){
      this.router.navigate(['/client/boutique/details', storeId]);
    }
  }

  protected readonly ConstanteUtil = ConstanteUtil;
  protected readonly UtilitaireUtil = UtilitaireUtil;
}
