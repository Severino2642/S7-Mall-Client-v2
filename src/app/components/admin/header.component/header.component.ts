import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'danger';
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery = '';
  showNotifications = false;

  // Nombre de notifications non lues
  unreadCount = 3;

  // Liste des notifications
  notifications: Notification[] = [
    {
      id: 1,
      title: 'Nouvelle facture',
      message: 'La facture INV-001 a été créée',
      time: 'Il y a 5 min',
      read: false,
      type: 'info'
    },
    {
      id: 2,
      title: 'Paiement reçu',
      message: 'Paiement de 1,200.00 € reçu',
      time: 'Il y a 1 heure',
      read: false,
      type: 'success'
    },
    {
      id: 3,
      title: 'Facture en retard',
      message: 'La facture INV-003 est en retard',
      time: 'Il y a 2 heures',
      read: false,
      type: 'warning'
    },
    {
      id: 4,
      title: 'Rapport mensuel',
      message: 'Le rapport du mois est disponible',
      time: 'Il y a 1 jour',
      read: true,
      type: 'info'
    }
  ];

  // Breadcrumb
  breadcrumbs = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Home', link: '/home' },
    { label: 'Accounting', link: null } // null = page actuelle
  ];

  // Toggle le panneau des notifications
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  // Fermer les notifications
  closeNotifications(): void {
    this.showNotifications = false;
  }

  // Marquer une notification comme lue
  markAsRead(notification: Notification): void {
    if (!notification.read) {
      notification.read = true;
      this.updateUnreadCount();
    }
  }

  // Marquer toutes comme lues
  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.updateUnreadCount();
  }

  // Supprimer une notification
  deleteNotification(notification: Notification): void {
    this.notifications = this.notifications.filter(n => n.id !== notification.id);
    this.updateUnreadCount();
  }

  // Mettre à jour le compteur de notifications non lues
  updateUnreadCount(): void {
    this.unreadCount = this.notifications.filter(n => !n.read).length;
  }

  // Rechercher
  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Recherche:', this.searchQuery);
      // Implémenter la logique de recherche
    }
  }

  // Naviguer vers le breadcrumb
  navigateTo(link: string | null): void {
    if (link) {
      console.log('Navigate to:', link);
      // Implémenter la navigation avec Router
      // this.router.navigate([link]);
    }
  }

  // Raccourci clavier pour la recherche (⌘F ou Ctrl+F)
  // handleSearchShortcut(event: KeyboardEvent): void {
  //   if ((event.metaKey || event.ctrlKey) && event.key === 'f') {
  //     event.preventDefault();
  //     const searchInput = document.querySelector('.search-input') as HTMLInputElement;
  //     searchInput?.focus();
  //   }
  // }

  // ngOnInit(): void {
  //   // Écouter les raccourcis clavier
  //   document.addEventListener('keydown', (e) => this.handleSearchShortcut(e));
  // }
  //
  // ngOnDestroy(): void {
  //   // Nettoyer les écouteurs
  //   document.removeEventListener('keydown', (e) => this.handleSearchShortcut(e));
  // }
}
