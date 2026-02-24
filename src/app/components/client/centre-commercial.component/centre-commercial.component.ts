import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header.component/header.component';
import { FooterComponent } from '../footer.component/footer.component';

declare var google: any;

export interface CentreCommercial {
  id: number;
  nom: string;
  adresse: string;
  ville: string;
  heureOuverture: string;
  heureFermeture: string;
  telephone?: string;
  email?: string;
  image?: string;
  latitude: number;
  longitude: number;
  description?: string;
}

@Component({
  selector: 'app-centre-commercial',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './centre-commercial.component.html',
  styleUrls: ['./centre-commercial.component.css']
})
export class CentreCommercialComponent implements OnInit, AfterViewInit {
  centres: CentreCommercial[] = [
    {
      id: 1,
      nom: 'OLYMPIA Mall',
      adresse: '123 Avenue de l\'Indépendance',
      ville: 'Antananarivo',
      heureOuverture: '09:00',
      heureFermeture: '21:00',
      telephone: '+261 20 22 123 45',
      email: 'contact@olympia-mall.mg',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800',
      latitude: -18.8792,
      longitude: 47.5079,
      description: 'Le plus grand centre commercial de Madagascar avec plus de 200 boutiques'
    },
    {
      id: 2,
      nom: 'Tana Plaza',
      adresse: '45 Boulevard de la République',
      ville: 'Antananarivo',
      heureOuverture: '10:00',
      heureFermeture: '20:00',
      telephone: '+261 20 22 456 78',
      email: 'info@tanaplaza.mg',
      image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800',
      latitude: -18.9134,
      longitude: 47.5361,
      description: 'Centre commercial moderne au cœur de la capitale'
    },
    {
      id: 3,
      nom: 'Akoor City',
      adresse: '78 Route de l\'Aéroport',
      ville: 'Ivato',
      heureOuverture: '08:00',
      heureFermeture: '22:00',
      telephone: '+261 20 22 789 12',
      email: 'contact@akoorcity.mg',
      image: 'https://images.unsplash.com/photo-1567958451986-2de427a4a0be?w=800',
      latitude: -18.7969,
      longitude: 47.4787,
      description: 'Shopping et divertissement près de l\'aéroport'
    },
    {
      id: 4,
      nom: 'Village des Jeux',
      adresse: '12 Avenue des Champions',
      ville: 'Antananarivo',
      heureOuverture: '09:30',
      heureFermeture: '21:30',
      telephone: '+261 20 22 345 67',
      email: 'contact@villagedesjeux.mg',
      image: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800',
      latitude: -18.9047,
      longitude: 47.5234,
      description: 'Centre commercial spécialisé en divertissement et loisirs'
    },
    {
      id: 5,
      nom: 'Ankorondrano Center',
      adresse: '56 Lalana Rainitovo',
      ville: 'Antananarivo',
      heureOuverture: '10:00',
      heureFermeture: '19:00',
      telephone: '+261 20 22 567 89',
      email: 'info@ankorondrano.mg',
      image: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800',
      latitude: -18.8950,
      longitude: 47.5280,
      description: 'Centre commercial de quartier avec boutiques locales'
    }
  ];

  selectedCentre: CentreCommercial | null = null;
  searchTerm: string = '';
  filteredCentres: CentreCommercial[] = [];

  // Map settings
  mapCenter = { lat: -18.8792, lng: 47.5079 };
  mapZoom = 12;
  private map: any;
  private markers: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filteredCentres = [...this.centres];
    // Sélectionner le premier centre par défaut
    if (this.centres.length > 0) {
      this.selectCentre(this.centres[0]);
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  // Initialiser Google Maps
  private initMap(): void {
    const mapElement = document.getElementById('map');
    if (!mapElement || typeof google === 'undefined') {
      console.error('Google Maps API non chargée ou élément map introuvable');
      return;
    }

    const mapOptions = {
      center: this.mapCenter,
      zoom: this.mapZoom,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    };

    this.map = new google.maps.Map(mapElement, mapOptions);
    this.addMarkers();
  }

  // Ajouter les marqueurs sur la carte
  private addMarkers(): void {
    // Supprimer les anciens marqueurs
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];

    // Ajouter un marqueur pour chaque centre
    this.filteredCentres.forEach(centre => {
      const marker = new google.maps.Marker({
        position: { lat: centre.latitude, lng: centre.longitude },
        map: this.map,
        title: centre.nom,
        animation: google.maps.Animation.DROP,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#1A4A54',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 3,
          scale: 12
        }
      });

      // Info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h6 style="margin: 0 0 8px 0; color: #1A4A54; font-weight: bold;">${centre.nom}</h6>
            <p style="margin: 0 0 5px 0; font-size: 13px; color: #666;">${centre.adresse}</p>
            <p style="margin: 0; font-size: 12px;">
              <span style="display: inline-block; padding: 2px 8px; border-radius: 12px; background: ${this.isOpen(centre) ? '#d4edda' : '#f8d7da'}; color: ${this.isOpen(centre) ? '#155724' : '#721c24'};">
                ${this.isOpen(centre) ? 'Ouvert' : 'Fermé'}
              </span>
            </p>
          </div>
        `
      });

      // Événement au clic sur le marqueur
      marker.addListener('click', () => {
        this.selectCentre(centre);
        infoWindow.open(this.map, marker);
        
        // Centrer la carte sur le marqueur cliqué
        this.map.panTo(marker.getPosition());
        
        // Mettre à jour les icônes des marqueurs
        this.updateMarkerIcons(marker);
      });

      this.markers.push(marker);
    });
  }

  // Mettre à jour les icônes des marqueurs (actif/inactif)
  private updateMarkerIcons(activeMarker: any): void {
    this.markers.forEach(marker => {
      const isActive = marker === activeMarker;
      marker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: isActive ? '#DDC9A4' : '#1A4A54',
        fillOpacity: 1,
        strokeColor: '#ffffff',
        strokeWeight: 3,
        scale: isActive ? 15 : 12
      });
    });
  }

  // Sélectionner un centre commercial
  selectCentre(centre: CentreCommercial): void {
    this.selectedCentre = centre;
    // Centrer la carte sur le centre sélectionné
    this.mapCenter = { lat: centre.latitude, lng: centre.longitude };
    
    if (this.map) {
      this.map.panTo(this.mapCenter);
      
      // Trouver et activer le marqueur correspondant
      const markerIndex = this.filteredCentres.findIndex(c => c.id === centre.id);
      if (markerIndex !== -1 && this.markers[markerIndex]) {
        this.updateMarkerIcons(this.markers[markerIndex]);
      }
    }
  }

  // Vérifier si un centre est ouvert actuellement
  isOpen(centre: CentreCommercial): boolean {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const [openHour, openMin] = centre.heureOuverture.split(':').map(Number);
    const [closeHour, closeMin] = centre.heureFermeture.split(':').map(Number);
    
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;
    
    return currentTime >= openTime && currentTime < closeTime;
  }

  // Obtenir le statut d'ouverture
  getStatus(centre: CentreCommercial): { text: string; class: string } {
    if (this.isOpen(centre)) {
      return { text: 'Ouvert', class: 'status-open' };
    }
    return { text: 'Fermé', class: 'status-closed' };
  }

  // Rechercher des centres
  searchCentres(): void {
    if (!this.searchTerm.trim()) {
      this.filteredCentres = [...this.centres];
    } else {
      const search = this.searchTerm.toLowerCase();
      this.filteredCentres = this.centres.filter(centre =>
        centre.nom.toLowerCase().includes(search) ||
        centre.adresse.toLowerCase().includes(search) ||
        centre.ville.toLowerCase().includes(search)
      );
    }
    
    // Rafraîchir les marqueurs sur la carte
    if (this.map) {
      this.addMarkers();
    }
  }

  // Obtenir l'itinéraire (ouvrir Google Maps)
  getDirections(centre: CentreCommercial): void {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${centre.latitude},${centre.longitude}`;
    window.open(url, '_blank');
  }

  // Appeler le centre
  callCentre(centre: CentreCommercial): void {
    if (centre.telephone) {
      window.location.href = `tel:${centre.telephone}`;
    }
  }

  // Envoyer un email
  emailCentre(centre: CentreCommercial): void {
    if (centre.email) {
      window.location.href = `mailto:${centre.email}`;
    }
  }

  // Calculer la distance (approximative)
  getDistance(centre: CentreCommercial): string {
    // Simulation - en production, utiliser la géolocalisation réelle
    const distances = [2.5, 5.8, 12.3, 7.1, 4.6];
    const index = this.centres.findIndex(c => c.id === centre.id);
    return `${distances[index] || 0} km`;
  }

  // Formater l'heure
  formatTime(time: string): string {
    return time;
  }

  // Naviguer vers les boutiques du centre
  viewProducts(centre: CentreCommercial): void {
    this.router.navigate(['/client/boutique'], { queryParams: { centre: centre.id } });
  }
}
