import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login.component/login.component';
import { HomeComponent } from './components/admin/home.component/home.component';
import { ClientRegisterComponent } from './components/auth/client-register.component/client-register.component';
import { OwnerRegisterComponent } from './components/auth/owner-register.component/owner-register.component';
import { MallRegisterComponent } from './components/auth/mall-register.component/mall-register.component';
import { ParkingComponent } from './components/admin/parking.component/parking.component';
import {InvoicesComponent} from './components/invoice/invoice';
import {BoxeListeComponent} from './components/admin/boxe/boxe.liste.component/boxe.liste.component';
import {BoxeSaisieComponent} from './components/admin/boxe/boxe.saisie.component/boxe.saisie.component';
import {BoxeDetailsComponent} from "./components/admin/boxe/boxe.details/boxe.details.component";
import {OffreLocationFormComponent} from "./components/admin/offre_location/offre-location.form/offre-location.form.component";
import {
  OffreLocationDetailsComponent
} from "./components/admin/offre_location/offre-location.details/offre-location.details.component";
import {
  OffreLocationListeComponent
} from "./components/admin/offre_location/offre-location.liste/offre-location.liste.component";

import {
  OffreLocationListeComponentFrontOffice
} from "./components/proprietaire/offre_location/offre-location.liste/offre-location.liste.component";
import {
  OffreLocationDetailsFrontOfficeComponent
} from "./components/proprietaire/offre_location/offre-location.details/offre-location.details.component";
import {
  FichierSaisieMultipleComponent
} from "./components/fichier_rattacher/fichier-saisie-multiple/fichier-saisie-multiple.component";
import {
  DemandeLocationListeComponent
} from "./components/proprietaire/demande_location/demande-location.liste/demande-location.liste.component";
import {
  BoutiqueListeComponent
} from "./components/proprietaire/boutique/boutique/boutique.liste/boutique.liste.component";
import {
  BoutiqueDetailsComponent
} from "./components/proprietaire/boutique/boutique/boutique.details/boutique.details.component";
import {BoutiqueFormComponent} from "./components/proprietaire/boutique/boutique/boutique-form/boutique-form.component";
import {ProduitFormComponent} from "./components/proprietaire/boutique/produit/produit-form/produit-form.component";
import {
  ProduitDetailsComponent
} from "./components/proprietaire/boutique/produit/produit-details/produit-details.component";
import {ProduitListeComponent} from "./components/proprietaire/boutique/produit/produit-liste/produit-liste.component";
import {StockFormComponent} from "./components/proprietaire/boutique/stock/stock-form/stock-form.component";
import {StockDetailsComponent} from "./components/proprietaire/boutique/stock/stock-details/stock-details.component";
import {StockListeComponent} from "./components/proprietaire/boutique/stock/stock-liste/stock-liste.component";
import {VenteFormComponent} from "./components/proprietaire/boutique/vente/vente-form/vente-form.component";
import {VenteDetailsComponent} from "./components/proprietaire/boutique/vente/vente-details/vente-details.component";
import {VenteListeComponent} from "./components/proprietaire/boutique/vente/vente-liste/vente-liste.component";
import {CaisseFormComponent} from "./components/caisse/caisse/caisse-form/caisse-form.component";
import {CaisseDetailsComponent} from "./components/caisse/caisse/caisse-details/caisse-details.component";
import {CaisseListeComponent} from "./components/caisse/caisse/caisse-liste/caisse-liste.component";
import {
  MouvementCaisseFormComponent
} from "./components/caisse/mouvement-caisse/mouvement-caisse-form/mouvement-caisse-form.component";
import {
  MouvementCaisseDetailsComponent
} from "./components/caisse/mouvement-caisse/mouvement-caisse-details/mouvement-caisse-details.component";
import {
  MouvementCaisseListeComponent
} from "./components/caisse/mouvement-caisse/mouvement-caisse-liste/mouvement-caisse-liste.component";
import {ClientFormMinComponent} from "./components/client/client/client-form-min/client-form-min.component";
import {
  MarketProduitListeComponent
} from "./components/client/marketplace/produit/market-produit-liste/market-produit-liste.component";
import {
  MarketProduitDetailsComponent
} from "./components/client/marketplace/produit/market-produit-details/market-produit-details.component";
import {
  MarketPanierListeComponent
} from "./components/client/marketplace/panier/market-panier-liste/market-panier-liste.component";
import {CommandeListeComponent} from "./components/client/marketplace/commande/commande-liste/commande-liste.component";
import {
  CommandeDetailsComponent
} from "./components/client/marketplace/commande/commande-details/commande-details.component";
import {
  MarketBonCommandeDetailsComponent
} from "./components/client/marketplace/bon_de_commande/market-bon-commande-details/market-bon-commande-details.component";
import {
  BonCommandeDetailsComponent
} from "./components/proprietaire/boutique/bon_commande/bon-commande-details/bon-commande-details.component";
import {
  BonCommandeListeComponent
} from "./components/proprietaire/boutique/bon_commande/bon-commande-liste/bon-commande-liste.component";
import {ManagerListeComponent} from "./components/proprietaire/manager/manager-liste/manager-liste.component";
import {ManagerDetailsComponent} from "./components/proprietaire/manager/manager-details/manager-details.component";
import {ManagerFormComponent} from "./components/proprietaire/manager/manager-form/manager-form.component";
import {
  PaymentLoyerListeComponent
} from "./components/proprietaire/payment_loyer/payment-loyer-liste/payment-loyer-liste.component";
import {
  PaymentLoyerDetailsComponent
} from "./components/proprietaire/payment_loyer/payment-loyer-details/payment-loyer-details.component";
import {
  PaymentLoyerFormComponent
} from "./components/proprietaire/payment_loyer/payment-loyer-form/payment-loyer-form.component";
import {
  CentreCommercialDetailsComponent
} from "./components/admin/centre_commercial/centre-commercial-details/centre-commercial-details.component";
import {
  CentreCommercialFormComponent
} from "./components/admin/centre_commercial/centre-commercial-form/centre-commercial-form.component";
import {
  CentreCommercialDetailsForProprietaireComponent
} from "./components/admin/centre_commercial/centre-commercial-details-for-proprietaire/centre-commercial-details-for-proprietaire.component";
import {
  CentreCommercialDetailsForClientComponent
} from "./components/admin/centre_commercial/centre-commercial-details-for-client/centre-commercial-details-for-client.component";
import {
  BoutiqueDetailsForClientComponent
} from "./components/proprietaire/boutique/boutique/boutique-details-for-client/boutique-details-for-client.component";
import {
  ProprietaireDetailsComponent
} from "./components/proprietaire/proprietaire-details/proprietaire-details.component";
import {ProprietaireFormComponent} from "./components/proprietaire/proprietaire-form/proprietaire-form.component";
import {ClientDetailsComponent} from "./components/client/client/client-details/client-details.component";
import {ClientFormComponent} from "./components/client/client/client-form/client-form.component";
import {
  LocationBoxeListeComponent
} from "./components/proprietaire/location_boxe/location-boxe-liste/location-boxe-liste.component";
import {
  LocationBoxeDetailsComponent
} from "./components/proprietaire/location_boxe/location-boxe-details/location-boxe-details.component";
import {
  LocationBoxeFormComponent
} from "./components/proprietaire/location_boxe/location-boxe-form/location-boxe-form.component";

export const routes: Routes = [
    { path: 'login', component:  LoginComponent},
    { path: 'register/client', component:  ClientRegisterComponent},
    { path: 'register/owner', component:  OwnerRegisterComponent},
    { path: 'register/mall', component:  MallRegisterComponent},
    { path: 'admin/home', component:  HomeComponent},

    // Centre commercial
    { path: 'admin/centre_commercial/details/:id', component:  CentreCommercialDetailsComponent},
    { path: 'admin/centre_commercial/create', component:  CentreCommercialFormComponent},
    { path: 'admin/centre_commercial/update/:id', component:  CentreCommercialFormComponent},
    { path: 'owner/centre_commercial/details/:id', component:  CentreCommercialDetailsForProprietaireComponent},
    { path: 'client/centre_commercial/details/:id', component:  CentreCommercialDetailsForClientComponent},

    // Boxe
    { path: 'admin/boxe', component:  BoxeListeComponent},
    { path: 'admin/boxe/details/:id', component:  BoxeDetailsComponent},
    { path: 'admin/boxe/create', component:  BoxeSaisieComponent},
    { path: 'admin/boxe/update/:id', component:  BoxeSaisieComponent},
    // Offre de location
    { path: 'admin/offreLocation', component:  OffreLocationListeComponent},
    { path: 'admin/offreLocation/details/:id', component:  OffreLocationDetailsComponent},
    { path: 'admin/offreLocation/create', component:  OffreLocationFormComponent},
    { path: 'admin/offreLocation/update/:id', component:  OffreLocationFormComponent},

    { path: 'owner/offreLocation/liste', component:  OffreLocationListeComponentFrontOffice},
    { path: 'owner/offreLocation/details/:id', component:  OffreLocationDetailsFrontOfficeComponent},

    { path: 'owner/details/:id', component:  ProprietaireDetailsComponent},
    { path: 'owner/update/:id', component:  ProprietaireFormComponent},
    // Demande de location
    { path: 'owner/demandeLocation', component:  DemandeLocationListeComponent},
    { path: 'owner/location_boxe', component:  LocationBoxeListeComponent},
    { path: 'owner/location_boxe/details/:id', component:  LocationBoxeDetailsComponent},
    { path: 'owner/location_boxe/update/:id', component:  LocationBoxeFormComponent},
    // Boutique
    { path: 'owner/boutique', component:  BoutiqueListeComponent},
    { path: 'owner/boutique/details/:id', component:  BoutiqueDetailsComponent},
    { path: 'owner/boutique/update/:id', component:  BoutiqueFormComponent},
    { path: 'owner/boutique/create', component:  BoutiqueFormComponent},
    { path: 'client/boutique/details/:id', component:  BoutiqueDetailsForClientComponent},

    // Manager
    { path: 'owner/manager', component:  ManagerListeComponent},
    { path: 'owner/manager/details/:id', component:  ManagerDetailsComponent},
    { path: 'owner/manager/create', component:  ManagerFormComponent},
    { path: 'owner/manager/update/:id', component:  ManagerFormComponent},

    // Payment loyer
    { path: 'owner/payment_loyer', component:  PaymentLoyerListeComponent},
    { path: 'owner/payment_loyer/details/:id', component:  PaymentLoyerDetailsComponent},
    { path: 'owner/payment_loyer/create', component:  PaymentLoyerFormComponent},
    { path: 'owner/payment_loyer/update/:id', component:  PaymentLoyerFormComponent},

    // Produit de boutique
    { path: 'boutique/produit/create', component:  ProduitFormComponent},
    { path: 'boutique/produit/update/:id', component:  ProduitFormComponent},
    { path: 'boutique/produit/details/:id', component:  ProduitDetailsComponent},
    { path: 'boutique/produit', component:  ProduitListeComponent},

    // Stock de boutique
    { path: 'boutique/stock/create', component:  StockFormComponent},
    { path: 'boutique/stock/update/:id', component:  StockFormComponent},
    { path: 'boutique/stock/details/:id', component:  StockDetailsComponent},
    { path: 'boutique/stock', component:  StockListeComponent},

    // Vente de boutique
    { path: 'boutique/vente/create', component:  VenteFormComponent},
    { path: 'boutique/vente/update/:id', component:  VenteFormComponent},
    { path: 'boutique/vente/details/:id', component:  VenteDetailsComponent},
    { path: 'boutique/vente', component:  VenteListeComponent},

    // Bon de commande de boutique
    { path: 'boutique/bon_commande/details/:id', component:  BonCommandeDetailsComponent},
    { path: 'boutique/bon_commande', component:  BonCommandeListeComponent},

    // Caisse
    { path: 'caisse/create', component:  CaisseFormComponent},
    { path: 'caisse/update/:id', component:  CaisseFormComponent},
    { path: 'caisse/details/:id', component:  CaisseDetailsComponent},
    { path: 'caisse', component:  CaisseListeComponent},

    { path: 'caisse/mouvement/create', component:  MouvementCaisseFormComponent},
    { path: 'caisse/mouvement/update/:id', component:  MouvementCaisseFormComponent},
    { path: 'caisse/mouvement/details/:id', component:  MouvementCaisseDetailsComponent},
    { path: 'caisse/mouvement', component:  MouvementCaisseListeComponent},
    // fichier rattacher
    { path: 'fichier/create/:idProprietaire', component:  FichierSaisieMultipleComponent},

    // Client
    { path: 'client/details/:id', component:  ClientDetailsComponent},
    { path: 'client/update/:id', component:  ClientFormComponent},
    { path: 'client/market/produit', component:  MarketProduitListeComponent},
    { path: 'client/market/produit/details/:id', component:  MarketProduitDetailsComponent},
    { path: 'client/market/panier', component:  MarketPanierListeComponent},
    { path: 'client/market/commande', component:  CommandeListeComponent},
    { path: 'client/market/commande/details/:id', component:  CommandeDetailsComponent},
    { path: 'client/market/bon_commande/details/:id', component:  MarketBonCommandeDetailsComponent},


    { path: 'admin/parking', component:  ParkingComponent},
    { path: 'invoice', component:  InvoicesComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
