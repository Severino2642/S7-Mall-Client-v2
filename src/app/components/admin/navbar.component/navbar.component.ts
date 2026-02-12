import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {StorageUtil} from '../../../utils/storage.util';

export interface MenuItem {
  label: string;
  icon: string;
  route?: string;
  children?: MenuItem[];
  expanded?: boolean;
}

export interface UserInfo {
  name: string;
  email: string;
  avatar?: string;
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
    avatar: 'assets/avatar.jpg' // Remplacer par le chemin de votre image
  };

  menuItems: MenuItem[] = [
    {
      label: 'MENU',
      icon: '',
      children: [
        { label: 'Tableau de bord', icon: 'fa fa-area-chart', route: '/home' },
        {
          label: 'Boxes',
          icon: 'fa fa-shop',
          route: '',
          children: [
            { label: 'Saisie', icon: '', route: '/admin/boxes/saisie' },
            { label: 'Liste', icon: '', route: '/admin/boxes/liste' }
          ]
        }
      ]
    }
  ];

  userMenuItems = [
    { label: 'Edit', icon: 'fa-edit', action: 'edit' },
    { label: 'Déconnexion', icon: 'fa-door-open', action: 'logout' }
  ];

  ngOnInit(): void {
    var user = StorageUtil.getFromStorage<any>("auth");
    var mall = StorageUtil.getFromStorage<any>("mall");
    console.log("User from storage:", user);
    if (user) {
      this.userInfo.name = mall.nom;
      this.userInfo.email = user.identifiant;
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
        console.log('Logout');
        // Ajouter votre logique de déconnexion
        break;
    }
  }

  navigateTo(route?: string): void {
    if (route) {
      console.log('Navigate to:', route);
      // Ajouter votre logique de navigation (ex: this.router.navigate([route]))
    }
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  }
}
