import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {NavbarComponent} from "../../navbar.component/navbar.component";
import {HeaderComponent} from "../../header.component/header.component";
import {Boxe, BoxeModel} from "../../../../models/boxe.model";
import {BoxeService} from "../../../../services/boxe.service/boxe.service";
import {OffreLocationOngletComponent} from "../onglet/offre-location.onglet/offre-location.onglet.component";
import {
  FichierListeOngletComponent
} from "../../../fichier_rattacher/fichier-liste-onglet/fichier-liste-onglet.component";

@Component({
  selector: 'app-boxe-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HeaderComponent, OffreLocationOngletComponent, RouterLink, FichierListeOngletComponent],
  templateUrl: './boxe.details.component.html',
  styleUrls: ['./boxe.details.component.css']
})
export class BoxeDetailsComponent implements OnInit {
  item?: BoxeModel | null;
  loading = false;
  activeTab: 'tab1' | 'tab2' = 'tab1';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private boxeService: BoxeService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.params['id'];
    if (id) {
      await this.loadItem(id);
    }
  }

  async loadItem(id: string): Promise<void> {
    this.loading = true;
    this.item = await this.boxeService.getById(id);
    this.loading = false;
  }

  // Changer d'onglet
  changeTab(tab: 'tab1' | 'tab2'): void {
    this.activeTab = tab;
  }

  // Calculer la surface
  calculateSurface(): number {
    if (!this.item) return 0;
    return (this.item.longueur || 0) * (this.item.largeur || 0);
  }

  // Modifier le boxe
  editBoxe(): void {
    if (this.item?._id) {
      this.router.navigate(['admin/boxe/update', this.item._id]);
    }
  }

  async deleteItem(): Promise<void> {
    if (this.item?._id) {
      await this.boxeService.delete(this.item._id);
      this.router.navigate(['admin/boxe/']);
    }
  }
  // Retour à la liste
  goBack(): void {
    this.router.navigate(['admin/boxe']);
  }

  // Formater le montant
  formatAmount(amount: number): string {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + ' €';
  }

  protected readonly Boxe = Boxe;
}
