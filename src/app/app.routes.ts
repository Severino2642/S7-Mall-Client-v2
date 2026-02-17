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

export const routes: Routes = [
    { path: 'login', component:  LoginComponent},
    { path: 'register/client', component:  ClientRegisterComponent},
    { path: 'register/owner', component:  OwnerRegisterComponent},
    { path: 'register/mall', component:  MallRegisterComponent},
    { path: 'admin/home', component:  HomeComponent},
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

    // Demande de location
    { path: 'owner/demandeLocation', component:  DemandeLocationListeComponent},

    // Boutique
    { path: 'owner/boutique', component:  BoutiqueListeComponent},
    { path: 'owner/boutique/details/:id', component:  BoutiqueDetailsComponent},
    { path: 'owner/boutique/update/:id', component:  BoutiqueFormComponent},

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

    // Caisse
    { path: 'caisse/create', component:  CaisseFormComponent},
    { path: 'caisse/update/:id', component:  CaisseFormComponent},
    { path: 'caisse/details/:id', component:  CaisseDetailsComponent},
    { path: 'caisse', component:  CaisseListeComponent},

    // Caisse
    { path: 'caisse/mouvement/create', component:  MouvementCaisseFormComponent},
    { path: 'caisse/mouvement/update/:id', component:  MouvementCaisseFormComponent},
    { path: 'caisse/mouvement/details/:id', component:  MouvementCaisseDetailsComponent},
    { path: 'caisse/mouvement', component:  MouvementCaisseListeComponent},
    // fichier rattacher
    { path: 'fichier/create/:idProprietaire', component:  FichierSaisieMultipleComponent},

    { path: 'admin/parking', component:  ParkingComponent},
    { path: 'invoice', component:  InvoicesComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
