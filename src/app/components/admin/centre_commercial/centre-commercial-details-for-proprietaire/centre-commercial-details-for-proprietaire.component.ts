import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {CentreCommercial, CentreCommercialCPLModel, CentreCommercialModel} from "../../../../models/mall.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MallService} from "../../../../services/mall.service/mall.service";
import {BoutiqueCPLModel} from "../../../../models/boutique.model";
import {ProduitCPLModel} from "../../../../models/produit.model";
import {BoutiqueService} from "../../../../services/boutique.service/boutique.service";
import {ProduitService} from "../../../../services/produit.service/produit.service";
import {ConstanteUtil} from "../../../../utils/constante.util";
import {
  FichierListeOngletComponent
} from "../../../fichier_rattacher/fichier-liste-onglet/fichier-liste-onglet.component";
import {HeaderComponent} from "../../header.component/header.component";
import {NavbarComponent} from "../../navbar.component/navbar.component";
import {FormsModule} from "@angular/forms";
import {
  CentreCommercialBoutiqueListeComponent
} from "../onglet/centre-commercial-boutique-liste/centre-commercial-boutique-liste.component";
import {
  CentreCommercialOffreListeComponent
} from "../onglet/centre-commercial-offre-liste/centre-commercial-offre-liste.component";
import {StorageUtil} from "../../../../utils/storage.util";
import {FollowerService} from "../../../../services/follower.service/follower.service";
import {UtilitaireUtil} from "../../../../utils/utilitaire.util";

@Component({
  selector: 'app-centre-commercial-details-for-proprietaire',
  standalone: true,
  imports: [CommonModule, FichierListeOngletComponent, HeaderComponent, NavbarComponent, FormsModule, CentreCommercialBoutiqueListeComponent, CentreCommercialOffreListeComponent],
  templateUrl: './centre-commercial-details-for-proprietaire.component.html',
  styleUrl: './centre-commercial-details-for-proprietaire.component.css'
})
export class CentreCommercialDetailsForProprietaireComponent {
  item?: CentreCommercialCPLModel | null;
  loading = false;
  isFollowing = false;
  activeTab = 'tab1';
  menuItems = [
    { id: 'tab1', label: 'BOUTIQUES', active: true },
    { id: 'tab2', label: 'OFFRES DE LOCATION', active: false }
  ];
  searchQuery = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: MallService,
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

  protected readonly CentreCommercial = CentreCommercial;

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

  protected readonly UtilitaireUtil = UtilitaireUtil;
}
