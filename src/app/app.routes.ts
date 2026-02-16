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
import { ProduitListeComponent } from './components/client/produit/produit.cmponent/produit-liste.component';
import { ProduitDetailsComponent } from './components/client/produit/details.component/produit-details.component';
import { PannierComponent } from './components/client/pannier.component/pannier.component';
import { CentreCommercialComponent } from './components/client/centre-commercial.component/centre-commercial.component';

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

    // fichier rattacher
    { path: 'fichier/create/:idProprietaire', component:  FichierSaisieMultipleComponent},

    // Client
    { path: 'client/produit', component: ProduitListeComponent},
    { path: 'client/produit/:id', component: ProduitDetailsComponent},
    { path: 'client/panier', component: PannierComponent},
    { path: 'client/centre', component: CentreCommercialComponent},

    { path: 'admin/parking', component:  ParkingComponent},
    { path: 'invoice', component:  InvoicesComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
