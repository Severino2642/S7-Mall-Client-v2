import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {UtilitaireUtil} from "../../../utils/utilitaire.util";
import {NotificationModel} from "../../../models/notification.model";
import {Router} from "@angular/router";
import {NotificationService} from "../../../services/notification.service/notification.service";
import {StorageUtil} from "../../../utils/storage.util";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

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
  private notifRefreshTimer: any;

  notifications: NotificationModel[] =[];
  idUser = "";
  // Breadcrumb
  breadcrumbs = [
    { label: 'Dashboard', link: '/dashboard' },
    { label: 'Home', link: '/home' },
    { label: 'Accounting', link: null } // null = page actuelle
  ];

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit(): Promise<void> {
    var boutique = StorageUtil.getFromStorage<any>("boutique");
    if (!boutique){
      var user = StorageUtil.getFromStorage<any>("auth");
      if (user) {
        this.idUser = user.idUser;
      }
    }
    else {
      this.idUser = boutique._id;
    }

    await this.loadNotifications();
    this.notifRefreshTimer = setInterval(() => {
      this.loadNotifications();
    }, 5000);
  }

  async loadNotifications(): Promise<void> {
    try {
      const notifications = await this.notificationService.getByIdUser(this.idUser);
      if (notifications) {
        this.notifications = notifications;
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }

  // Toggle le panneau des notifications
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  // Fermer les notifications
  closeNotifications(): void {
    this.showNotifications = false;
  }

  // Marquer comme lue
  async markAsRead(notification: NotificationModel): Promise<void> {
    notification.lu = true;
    if (notification._id){
      await this.notificationService.marquerCommeLu(notification._id);
    }
    this.router.navigate([notification.lien]);
  }

  // Marquer toutes comme lues
  async markAllAsRead(): Promise<void> {
    this.notifications.forEach(n => n.lu = true);
    await this.notificationService.toutmarquerCommeLu(this.idUser);
  }

  // Supprimer une notification
  async deleteNotification(notificationId: string): Promise<void> {
    this.notifications = this.notifications.filter(n => n._id !== notificationId);
    await this.notificationService.delete(notificationId);
  }

  // Compter les notifications non lues
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.lu).length;
  }

  getSafeBadge(badgeHtml: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(badgeHtml || '');
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
  protected readonly UtilitaireUtil = UtilitaireUtil;
}
