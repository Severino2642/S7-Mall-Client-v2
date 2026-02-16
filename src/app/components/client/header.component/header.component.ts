import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageUtil } from '../../../utils/storage.util';

export interface NavLink {
  label: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userInfo = {
    name: 'User',
    email: 'user@example.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4lwo2d4iLZi5Js-1BQeraxxX7ePmnVBsg5XTcsdbdBjRF2ODrdpscdmBGzTHpD9CmLUiilhqmheGGhwR8zZYjDVotEx_jzS-t_L51vIMQtW8dibaVmKvJOFhwCTezvUL4eAPLHc00BKnnNW92gwg9wCPyiU6pgSq_YXui-dMKLr4tVSMWnWxJmXuM3-wiZMc577pyEIEH0GoA_x5ncEMczDlUMSuYeSJQoOD_VXux6abowbV_9xfgucorfsDhHTGNAji1NtctouI'
  };

  navigationLinks: NavLink[] = [
    { label: 'Produits', route: '/client/produit', active: true },
    { label: 'Panier', route: '/client/panier', active: false },
    { label: 'Centre Commercial', route: '/client/centre', active: false },
  ];

  searchQuery: string = '';
  showUserMenu: boolean = false;

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.navigationLinks.forEach(link => {
      link.active = link.route === route;
    });
    this.router.navigate([route]);
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  closeUserMenu() {
    this.showUserMenu = false;
  }

  logout() {    
    // Close menu
    this.closeUserMenu();
    
    // Navigate to login page
    this.router.navigate(['/login']);
    
    console.log('User logged out');
  }
}
