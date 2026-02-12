import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

interface MenuItem {
  title: string;
  url: string;
  icon: string;
  roles?: string[];
}

interface User {
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  currentPath = '';

  currentUser: User = {
    firstName: 'John',
    lastName: 'Doe',
    role: 'Administrateur',
    avatar: ''
  };

  generalItems: MenuItem[] = [
    { title: 'Accueil', url: '/admin/home', icon: 'home' },
    { title: 'Boxe', url: '/admin/boxe', icon: 'home' },
    { title: 'Parking', url: '/admin/parking', icon: 'parking' },
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentPath = this.router.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentPath = event.url;
      });
  }

  isActivePath(url: string): boolean {
    return this.currentPath === url || this.currentPath.startsWith(url + '/');
  }

  get filteredGeneralItems(): MenuItem[] {
    return this.generalItems.filter(item =>
      !item.roles || item.roles.includes(this.currentUser.role.toLowerCase())
    );
  }

  handleLogout() {
    console.log('Déconnexion...');
    this.router.navigate(['/login']);
  }

  getIconSvg(iconName: string): string {
    const icons: { [key: string]: string } = {
      'chart': 'M3 3v18h18',
      'bar-chart': 'M12 20V10M6 20V4m12 16v-6',
      'file-text': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z',
      'home': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
      'parking' : 'M4 4h16v16H4V4z M9 8h4a3 3 0 0 1 0 6H9V8z M9 14v4',
      'store': 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
      'package': 'M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8',
      'grid': 'M10 3H3v7h7V3zM21 3h-7v7h7V3zM21 14h-7v7h7v-7zM10 14H3v7h7v-7z',
      'users': 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2',
      'check-circle': 'M22 11.08V12a10 10 0 1 1-5.93-9.14',
      'clipboard': 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2',
      'search': 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z',
      'alert-triangle': 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
      'activity': 'M22 12h-4l-3 9L9 3l-3 9H2',
      'check': 'M20 6L9 17l-5-5',
      'chevron-down': 'M6 9l6 6 6-6',
      'chevron-right': 'M9 18l6-6-6-6',
      'user': 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
      'log-out': 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4',
      'moon': 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z',
      'sun': 'M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42'
    };
    return icons[iconName] || icons['home'];
  }
}
