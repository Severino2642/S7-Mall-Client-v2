import { Component } from '@angular/core';
import {CentreCommercialCPLModel} from "../../../../../models/mall.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MallService} from "../../../../../services/mall.service/mall.service";
import {BoutiqueService} from "../../../../../services/boutique.service/boutique.service";
import {ProduitService} from "../../../../../services/produit.service/produit.service";
import {CommonModule} from "@angular/common";
import {Boutique, BoutiqueCPLModel} from "../../../../../models/boutique.model";
import {
  CentreCommercialBoutiqueListeComponent
} from "../../../../admin/centre_commercial/onglet/centre-commercial-boutique-liste/centre-commercial-boutique-liste.component";
import {
  CentreCommercialProduitListeComponent
} from "../../../../admin/centre_commercial/onglet/centre-commercial-produit-liste/centre-commercial-produit-liste.component";
import {HeaderComponent} from "../../../../client/header.component/header.component";
import {ConstanteUtil} from "../../../../../utils/constante.util";
import {BoutiqueProduitListeComponent} from "../onglet/boutique-produit-liste/boutique-produit-liste.component";
import {UtilitaireUtil} from "../../../../../utils/utilitaire.util";
import {StorageUtil} from "../../../../../utils/storage.util";
import {FollowerService} from "../../../../../services/follower.service/follower.service";

@Component({
  selector: 'app-boutique-details-for-client',
  standalone: true,
  imports: [CommonModule, CentreCommercialBoutiqueListeComponent, CentreCommercialProduitListeComponent, HeaderComponent, BoutiqueProduitListeComponent, RouterLink],
  templateUrl: './boutique-details-for-client.component.html',
  styleUrl: './boutique-details-for-client.component.css'
})
export class BoutiqueDetailsForClientComponent {
  item?: BoutiqueCPLModel | null;
  loading = false;
  isFollowing = false;
  activeTab = 'tab1';
  menuItems = [
    { id: 'tab1', label: 'ARTICLES', active: true }
  ];
  searchQuery = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: BoutiqueService,
    private boutiqueService: BoutiqueService,
    private produitService: ProduitService,
    private followerService: FollowerService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    if (id) {
      await this.loadItem(id);
      this.verifFollow();
    }
  }

  async loadItem(id: string): Promise<void> {
    this.loading = true;
    this.item = await this.itemService.getCPLById(id);
    this.loading = false;
  }

  // Changer d'onglet
  changeTab(tab: 'tab1'|'tab2'|'tab3'): void {
    this.activeTab = tab;
  }


  // Toggle follow
  async toggleFollow(): Promise<void> {
    const auth = StorageUtil.getFromStorage<any>("auth");
    if (!this.isFollowing && this.item && this.item.followers) {
      let newFollower = { idUser: this.item._id, idFollower: auth.idUser };
      await this.followerService.create(newFollower);
      this.item.followers.push(newFollower);
      this.isFollowing = true;
      return
    }
    if (this.isFollowing && this.item && this.item.followers) {
      await this.followerService.deleteFollowRelation(this.item._id, auth.idUser);
      this.item.followers = this.item.followers.filter(follower => follower.idFollower !== auth.idUser);
      this.isFollowing = false;
    }
  }

  verifFollow(): void {
    const auth = StorageUtil.getFromStorage<any>("auth");
    if (auth && auth.idUser && this.item && this.item.followers) {
      this.isFollowing = this.item.followers.some(follower => follower.idFollower === auth.idUser);
    }
  }

  // Partager la boutique
  shareStore(): void {
    console.log('Partager la boutique');
    alert('Lien de partage copié !');
  }

  // Changer de menu
  selectMenu(itemId: string): void {
    this.menuItems.forEach(item => {
      item.active = item.id === itemId;
    });
    this.activeTab = itemId;
  }

  // Recherche dans la boutique
  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Recherche:', this.searchQuery);
      // Logique de recherche
    }
  }

  protected readonly Boutique = Boutique;
  protected readonly ConstanteUtil = ConstanteUtil;
  protected readonly UtilitaireUtil = UtilitaireUtil;
}
