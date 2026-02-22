import {Component, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {StorageUtil} from "../../../utils/storage.util";
import {UserInfo} from "../../admin/navbar.component/navbar.component";
import {NotificationModel} from "../../../models/notification.model";
import {NotificationService} from "../../../services/notification.service/notification.service";
import {UtilitaireUtil} from "../../../utils/utilitaire.util";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  searchQuery = '';
  showUserMenu = false;
  showNotifications = false;
  cartItemsCount = 0;
  private cartRefreshTimer: any;
  private notifRefreshTimer: any;

  userInfo: UserInfo = {
    name: 'Wrath Neon',
    email: 'Johns@gmail.com',
    avatar: undefined, // Remplacer par le chemin de votre image
    role: 'Centre Commercial' // ou 'Proprietaire'
  };

  // Notifications
  notifications: NotificationModel[] =[];

  userMenuItems = [
    { label: 'Edit', icon: 'fa-edit', action: 'edit' },
    { label: 'Déconnexion', icon: 'fa-door-open', action: 'logout' }
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
      console.log("User from storage:", user);
      if (user) {
        this.userInfo.role = user.role.val;
        if (user.role.val === "Centre Commercial") {
          var mall = StorageUtil.getFromStorage<any>("mall");
          this.userInfo.name = mall.nom;
        }
        if (user.role.val === "Proprietaire") {
          var owner = StorageUtil.getFromStorage<any>("owner");
          this.userInfo.name = owner?.nom+" "+owner?.prenom;
          this.userInfo.avatar = owner.pdp;
        }
        if (user.role.val === "Client") {
          var owner = StorageUtil.getFromStorage<any>("client");
          this.userInfo.name = owner?.prenom;
          this.userInfo.avatar = owner.pdp;
        }
        this.userInfo.email = user.identifiant;
      }
    }
    else {
      this.userInfo.role = "Boutique";
      this.userInfo.name = boutique.nom;
      this.userInfo.email = boutique.email;
    }

    this.cartItemsCount = StorageUtil.getFromStorage<number>("cartItemsCount") || 0;

    this.cartRefreshTimer = setInterval(() => {
      this.cartItemsCount = StorageUtil.getFromStorage<number>("cartItemsCount") || 0;
    }, 2000);

    await this.loadNotifications();
    this.notifRefreshTimer = setInterval(() => {
      this.loadNotifications();
    }, 5000);
  }

  async loadNotifications(): Promise<void> {
    try {
      const user = StorageUtil.getFromStorage<any>("auth");
      if (user) {
        const notifications = await this.notificationService.getByIdUser(user.idUser);
        if (notifications) {
          this.notifications = notifications;
        }
      }
    } catch (error) {
      console.error('Error loading notifications:', error);
    }
  }

  // Recherche
  onSearch(): void {
    if (this.searchQuery.trim()) {
      console.log('Recherche:', this.searchQuery);
      // Navigation vers page de résultats
      // this.router.navigate(['/search'], { queryParams: { q: this.searchQuery } });
    }
  }

  // Toggle notifications
  toggleNotifications(): void {
    this.showNotifications = !this.showNotifications;
  }

  // Fermer les notifications
  closeNotifications(): void {
    this.showNotifications = false;
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu(): void {
    this.showUserMenu = false;
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
    const auth = StorageUtil.getFromStorage<any>("auth");
    if (auth) {
      await this.notificationService.toutmarquerCommeLu(auth.idUser);
    }
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

  // Navigation
  goToAccount(): void {
    this.router.navigate(['/account']);
  }

  goToOrders(): void {
    this.router.navigate(['/client/market/commande']);
  }

  goToCart(): void {
    this.router.navigate(['/client/market/panier']);
  }

  // Toggle menu mobile
  toggleMobileMenu(): void {
    console.log('Toggle mobile menu');
    // Logique pour ouvrir le menu mobile
  }

  navigateTo(route?: string): void {
    if (route) {
      this.router.navigate([route]);
    }
  }

  handleUserMenuAction(action: string): void {
    // this.showUserMenu = false;

    switch (action) {
      case 'edit':
        console.log('Edit profile');
        // Ajouter votre logique pour éditer le profil
        break;
      case 'logout':
        console.log('Logout');
        StorageUtil.clear();
        this.router.navigate(['/login']);
        break;
    }
  }


  protected readonly UtilitaireUtil = UtilitaireUtil;
}
