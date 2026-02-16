import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorageUtil} from '../../../utils/storage.util';
import {Router} from "@angular/router";

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
  role?: string;
}

export interface UserInfo {
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
          icon: 'fa fa-shop',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'admin/boxe/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'admin/boxe/' }
          ]
        },
        {
          label: 'Offres de location',
          icon: 'fa fa-shop',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'admin/offreLocation/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'admin/offreLocation/' }
          ]
        },
        { label: 'Demande de location', icon: 'fa fa-area-chart', route: '/owner/demandeLocation' },
        { label: 'Boutiques', icon: 'fa fa-shop', route: '/owner/boutique' }
      ]
    },
    {
      label: 'MENU',
      icon: '',
      role:'Proprietaire',
      children: [
        { label: 'Offres de location', icon: 'fa fa-area-chart', route: '/owner/offreLocation/liste' },
        { label: 'Demande de location', icon: 'fa fa-area-chart', route: '/owner/demandeLocation' },
        { label: 'Boutiques', icon: 'fa fa-shop', route: '/owner/boutique' }
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
            { label: 'Saisie', icon: 'fa fa-plus', route: 'admin/offreLocation/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'admin/offreLocation/' }
          ]
        },
        {
          label: 'Mouvements de stock',
          icon: 'fa fa-shop',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'admin/offreLocation/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'admin/offreLocation/' }
          ]
        },
        {
          label: 'Vente',
          icon: 'fa fa-shop',
          route: '',
          children: [
            { label: 'Saisie', icon: 'fa fa-plus', route: 'admin/offreLocation/create' },
            { label: 'Liste', icon: 'fa fa-list', route: 'admin/offreLocation/' }
          ]
        },
      ]
    }

  ];

  userMenuItems = [
    { label: 'Edit', icon: 'fa-edit', action: 'edit' },
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
          this.userInfo.name = mall.nom;
        }
        if (user.role.val === "Proprietaire") {
          var owner = StorageUtil.getFromStorage<any>("owner");
          this.userInfo.name = owner?.nom+" "+owner?.prenom;
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
      case 'edit':
        console.log('Edit profile');
        // Ajouter votre logique pour éditer le profil
        break;
      case 'logout':
        if (this.userInfo.role === "Boutique") {
          console.log('Logout boutique');
          StorageUtil.remove("boutique");
          this.router.navigate(['/login']);
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
