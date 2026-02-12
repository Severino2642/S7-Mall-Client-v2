import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {NavbarComponent} from "../../navbar.component/navbar.component";
import {HeaderComponent} from "../../header.component/header.component";
import {Boxe, BoxeModel} from "../../../../models/boxe.model";
import {BoxeService} from "../../../../services/boxe.service/boxe.service";

export interface ContratModel {
  _id?: string;
  client: {
    nom: string;
    id: string;
  };
  periode: {
    debut: string;
    fin: string;
  };
  typeContrat: string;
  loyerMensuel: number;
  statut: 'PAYE' | 'ARCHIVE' | 'EN_COURS';
}

@Component({
  selector: 'app-boxe-details',
  standalone: true,
  imports: [CommonModule, NavbarComponent, HeaderComponent],
  templateUrl: './boxe.details.component.html',
  styleUrls: ['./boxe.details.component.css']
})
export class BoxeDetailsComponent implements OnInit {
  item?: BoxeModel | null;
  loading = false;
  activeTab: 'ventes' | 'historique' = 'ventes';

  // Données factices pour la démo (à remplacer par vos vraies données)
  contrats: ContratModel[] = [
    {
      _id: '1',
      client: {
        nom: 'Logistique Royale SARL',
        id: 'LR-82829'
      },
      periode: {
        debut: '01 Jan 2023',
        fin: '31 Dec 2025'
      },
      typeContrat: 'Bail Commercial',
      loyerMensuel: 1250.00,
      statut: 'PAYE'
    },
    {
      _id: '2',
      client: {
        nom: 'Design Studio Lyon',
        id: 'DS-02892'
      },
      periode: {
        debut: '01 Oct 2021',
        fin: '31 Oct 2022'
      },
      typeContrat: 'Bail de Courte Durée',
      loyerMensuel: 1100.00,
      statut: 'ARCHIVE'
    }
  ];

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
  changeTab(tab: 'ventes' | 'historique'): void {
    this.activeTab = tab;
  }

  // Calculer la surface
  calculateSurface(): number {
    if (!this.item) return 0;
    return (this.item.longueur || 0) * (this.item.largeur || 0);
  }

  // Obtenir la classe CSS du badge de statut
  getStatusClass(statut: string): string {
    switch (statut) {
      case 'PAYE':
        return 'badge-paye';
      case 'ARCHIVE':
        return 'badge-archive';
      case 'EN_COURS':
        return 'badge-en-cours';
      default:
        return 'badge-secondary';
    }
  }

  // Obtenir le label du statut
  getStatusLabel(statut: string): string {
    switch (statut) {
      case 'PAYE':
        return 'Payé';
      case 'ARCHIVE':
        return 'Archivé';
      case 'EN_COURS':
        return 'En cours';
      default:
        return statut;
    }
  }

  // Voir les détails d'un contrat
  viewContrat(contrat: ContratModel): void {
    console.log('Voir contrat:', contrat);
    // Navigation vers les détails du contrat
    // this.router.navigate(['admin/contrat', contrat._id]);
  }

  // Modifier le boxe
  editBoxe(): void {
    if (this.item?._id) {
      this.router.navigate(['admin/boxe/update', this.item._id]);
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
