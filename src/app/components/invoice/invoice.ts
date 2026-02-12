import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Invoice {
  id: string;
  clientCode: string;
  clientName: string;
  emissionDate: string;
  amount: number;
  status: 'PAYEE' | 'EN_ATTENTE' | 'EN_RETARD';
}

export interface FilterOptions {
  period: string | null;
  client: string;
  status: string;
}

export interface Statistics {
  totalReceivables: number;
  totalReceivablesChange: number;
  totalPaid: number;
  totalPaidChange: number;
  totalOverdue: number;
  totalOverdueChange: number;
}

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice.html',
  styleUrls: ['./invoice.css']
})
export class InvoicesComponent implements OnInit {
  // Filtres
  filters: FilterOptions = {
    period: null,
    client: 'all',
    status: 'all'
  };

  // Liste des clients pour le dropdown
  clients = [
    { value: 'all', label: 'Tous les clients' },
    { value: 'AC', label: 'Acme Corp' },
    { value: 'GT', label: 'Global Tech' },
    { value: 'SI', label: 'Starlight Inc' }
  ];

  // Liste des statuts pour le dropdown
  statuses = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'PAYEE', label: 'Payée' },
    { value: 'EN_ATTENTE', label: 'En attente' },
    { value: 'EN_RETARD', label: 'En retard' }
  ];

  // Onglets
  activeTab: string = 'all';

  tabs = [
    { id: 'all', label: 'Toutes', count: 0 },
    { id: 'paid', label: 'Payées', count: 0 },
    { id: 'pending', label: 'En attente', count: 0 },
    { id: 'overdue', label: 'En retard', count: 0 }
  ];

  // Statistiques
  statistics: Statistics = {
    totalReceivables: 45200.00,
    totalReceivablesChange: 12.5,
    totalPaid: 32150.00,
    totalPaidChange: 6.2,
    totalOverdue: 4050.00,
    totalOverdueChange: -2.1
  };

  // Liste des factures
  invoices: Invoice[] = [
    {
      id: 'INV-001',
      clientCode: 'AC',
      clientName: 'Acme Corp',
      emissionDate: '24 Oct 2023',
      amount: 1200.00,
      status: 'PAYEE'
    },
    {
      id: 'INV-002',
      clientCode: 'GT',
      clientName: 'Global Tech',
      emissionDate: '25 Oct 2023',
      amount: 850.00,
      status: 'EN_ATTENTE'
    },
    {
      id: 'INV-003',
      clientCode: 'SI',
      clientName: 'Starlight Inc',
      emissionDate: '22 Oct 2023',
      amount: 2100.00,
      status: 'EN_RETARD'
    }
  ];

  // Factures filtrées
  filteredInvoices: Invoice[] = [];

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  ngOnInit(): void {
    this.applyFilters();
    this.updateTabCounts();
  }

  // Appliquer les filtres
  applyFilters(): void {
    this.filteredInvoices = this.invoices.filter(invoice => {
      // Filtre par client
      if (this.filters.client !== 'all' && invoice.clientCode !== this.filters.client) {
        return false;
      }

      // Filtre par statut
      if (this.filters.status !== 'all' && invoice.status !== this.filters.status) {
        return false;
      }

      // Filtre par onglet actif
      if (this.activeTab === 'paid' && invoice.status !== 'PAYEE') {
        return false;
      }
      if (this.activeTab === 'pending' && invoice.status !== 'EN_ATTENTE') {
        return false;
      }
      if (this.activeTab === 'overdue' && invoice.status !== 'EN_RETARD') {
        return false;
      }

      return true;
    });

    this.updatePagination();
  }

  // Réinitialiser les filtres
  resetFilters(): void {
    this.filters = {
      period: null,
      client: 'all',
      status: 'all'
    };
    this.applyFilters();
  }

  // Changer d'onglet
  changeTab(tabId: string): void {
    this.activeTab = tabId;
    this.currentPage = 1;
    this.applyFilters();
  }

  // Mettre à jour les compteurs des onglets
  updateTabCounts(): void {
    this.tabs[0].count = this.invoices.length;
    this.tabs[1].count = this.invoices.filter(i => i.status === 'PAYEE').length;
    this.tabs[2].count = this.invoices.filter(i => i.status === 'EN_ATTENTE').length;
    this.tabs[3].count = this.invoices.filter(i => i.status === 'EN_RETARD').length;
  }

  // Mettre à jour la pagination
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredInvoices.length / this.itemsPerPage);
  }

  // Obtenir les factures de la page courante
  getPaginatedInvoices(): Invoice[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredInvoices.slice(startIndex, endIndex);
  }

  // Aller à la page suivante
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Aller à la page précédente
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Aller à une page spécifique
  goToPage(page: number): void {
    this.currentPage = page;
  }

  // Obtenir la classe CSS pour le badge de statut
  getStatusClass(status: string): string {
    switch (status) {
      case 'PAYEE':
        return 'badge-success';
      case 'EN_ATTENTE':
        return 'badge-warning';
      case 'EN_RETARD':
        return 'badge-danger';
      default:
        return 'badge-secondary';
    }
  }

  // Obtenir le label du statut
  getStatusLabel(status: string): string {
    switch (status) {
      case 'PAYEE':
        return 'PAYÉE';
      case 'EN_ATTENTE':
        return 'EN ATTENTE';
      case 'EN_RETARD':
        return 'EN RETARD';
      default:
        return status;
    }
  }

  // Éditer une facture
  editInvoice(invoice: Invoice): void {
    console.log('Edit invoice:', invoice.id);
    // Implémenter la logique d'édition
  }

  // Supprimer une facture
  deleteInvoice(invoice: Invoice): void {
    console.log('Delete invoice:', invoice.id);
    // Implémenter la logique de suppression
  }

  // Formater le montant
  formatAmount(amount: number): string {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
