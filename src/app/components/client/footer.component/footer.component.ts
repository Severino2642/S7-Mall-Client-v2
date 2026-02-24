import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SocialLink {
  name: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  copyrightText: string = `© ${new Date().getFullYear()} Olympia Tanjombato. Tout droits réservés.`;
  
  currentYear: number = new Date().getFullYear();

  navigateToSocial(url: string) {
    if (url !== '#') {
      window.open(url, '_blank');
    }
  }
}
