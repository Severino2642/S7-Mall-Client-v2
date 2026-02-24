import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorageUtil} from '../../../utils/storage.util';
import {Router} from "@angular/router";
import {ConstanteUtil} from "../../../utils/constante.util";

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
  role?: string;
}

export interface UserInfo {
  id?:string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit{
  showUserMenu = false;

  userInfo: UserInfo = {
    name: 'Wrath Neon',
    email: 'Johns@gmail.com',
    avatar: undefined, // Remplacer par le chemin de votre image
    role: 'Centre Commercial' // ou 'Proprietaire'
  };

  menuItems: MenuItem[] = [
    {
      label: 'MENU',
      icon: '',
      role:'Centre Commercial',
      children: [
        { label: 'Tableau de bord', icon: 'fa fa-area-chart', route: '/home' },
        {
          label: 'Boxes',
          icon: 'fa fa-warehouse',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'admin/boxe/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'admin/boxe/' },
            { label: 'Locations', icon: 'fa fa-list', route: '/owner/location_boxe' }
          ]
        },
        {
          label: 'Offres de location',
          icon: 'fa fa-tag',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'admin/offreLocation/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'admin/offreLocation/' }
          ]
        },
        { label: 'Demande de location', icon: 'fa fa-file-alt', route: '/owner/demandeLocation' },
        { label: 'Boutiques', icon: 'fa fa-shop', route: '/owner/boutique' },
        { label: 'Payment de loyer', icon: 'fa fa-money-bill', route: '/owner/payment_loyer' },
        {
          label: 'Caisse',
          icon: 'fa fa-cash-register',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'caisse/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'caisse' }
          ]
        },
        {
          label: 'Mouvement de caisse',
          icon: 'fa fa-exchange-alt',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'caisse/mouvement/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'caisse/mouvement' }
          ]
        },
      ]
    },
    {
      label: 'MENU',
      icon: '',
      role:'Proprietaire',
      children: [
        { label: 'Offres de location', icon: 'fa fa-tag', route: '/owner/offreLocation/liste' },
        { label: 'Demande de location', icon: 'fa fa-file-alt', route: '/owner/demandeLocation' },
        { label: 'Mes boxes', icon: 'fa fa-warehouse', route: '/owner/location_boxe' },
        {
          label: 'Boutique',
          icon: 'fa fa-shop',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: '/owner/boutique/create' },
            { label: 'Liste', icon: 'fa fa-list', route: '/owner/boutique' }
          ]
        },
        {
          label: 'Manager',
          icon: 'fa fa-users',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'owner/manager/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'owner/manager/' }
          ]
        },
        {
          label: 'Payment de loyer',
          icon: 'fa fa-money-bill',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'owner/payment_loyer/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'owner/payment_loyer/' }
          ]
        },
        {
          label: 'Caisse',
          icon: 'fa fa-cash-register',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'caisse/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'caisse' }
          ]
        },
        {
          label: 'Mouvement de caisse',
          icon: 'fa fa-exchange-alt',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'caisse/mouvement/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'caisse/mouvement' }
          ]
        },
      ]
    },
    {
      label: 'GESTION DE BOUTIQUE',
      icon: '',
      role:'Boutique',
      children: [
        {
          label: 'Produits',
          icon: 'fa fa-shop',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'boutique/produit/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'boutique/produit/' }
          ]
        },
        {
          label: 'Stock',
          icon: 'fa fa-shop',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'boutique/stock/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'boutique/stock/' }
          ]
        },
        {
          label: 'Vente',
          icon: 'fa fa-shop',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'boutique/vente/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'boutique/vente/' }
          ]
        },
        { label: 'Bon de commande', icon: 'fa fa-area-chart', route: 'boutique/bon_commande/' },
        {
          label: 'Caisse',
          icon: 'fa fa-shop',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'caisse/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'caisse' }
          ]
        },
        {
          label: 'Mouvement de caisse',
          icon: 'fa fa-shop',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'caisse/mouvement/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'caisse/mouvement' }
          ]
        },
      ]
    }

  ];

  userMenuItems = [
    { label: 'Profil', icon: 'fa-user', action: 'profil' },
    { label: 'Déconnexion', icon: 'fa-door-open', action: 'logout' }
  ];

  constructor(
    private router : Router
  ) {}

  ngOnInit(): void {
    var boutique = StorageUtil.getFromStorage<any>("boutique");
    if (!boutique){
      var user = StorageUtil.getFromStorage<any>("auth");
      console.log("User from storage:", user);
      if (user) {
        this.userInfo.role = user.role.val;
        if (user.role.val === "Centre Commercial") {
          var mall = StorageUtil.getFromStorage<any>("mall");
          this.userInfo.id = mall._id;
          this.userInfo.name = mall.nom;
          this.userInfo.avatar = mall.pdp.url;
        }
        if (user.role.val === "Proprietaire") {
          var owner = StorageUtil.getFromStorage<any>("owner");
          this.userInfo.id = owner._id;
          this.userInfo.name = owner?.nom+" "+owner?.prenom;
          this.userInfo.avatar = owner.pdp;
        }
        this.userInfo.email = user.identifiant;
      }
    }
    else {
      this.userInfo.id = boutique._id;
      this.userInfo.role = "Boutique";
      this.userInfo.name = boutique.nom;
      this.userInfo.email = boutique.email;
    }
  }

  toggleSubmenu(item: MenuItem): void {
    if (item.children) {
      item.expanded = !item.expanded;
    }
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  handleUserMenuAction(action: string): void {
    this.showUserMenu = false;

    switch (action) {
      case 'profil':
        if (this.userInfo.role === ConstanteUtil.role_centre_commercial) {
          this.router.navigate(['admin/centre_commercial/details', this.userInfo.id]);
          return;
        }
        if (this.userInfo.role === ConstanteUtil.role_proprietaire) {
          this.router.navigate(['owner/details', this.userInfo.id]);
          return;
        }
        break;
      case 'logout':
        if (this.userInfo.role === "Boutique") {
          const auth = StorageUtil.getFromStorage<any>("auth");
          if (auth.role.val=="Manager"){
            StorageUtil.clear()
            this.router.navigate(['/login']);
            return;
          }
          console.log('Logout boutique');
          StorageUtil.remove("boutique");
          this.router.navigate(['owner/boutique/details',this.userInfo.id]);
          return;
        }
        console.log('Logout');
        StorageUtil.clear();
        this.router.navigate(['/login']);
        break;
    }
  }

  navigateTo(route?: string): void {
    if (route) {
      console.log('Navigate to:', route);
      this.router.navigate([route]);
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }

  get filteredMenuItems() {
    return this.menuItems.filter(section => section.role === this.userInfo.role);
  }
}
