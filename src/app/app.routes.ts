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


    { path: 'admin/parking', component:  ParkingComponent},
    { path: 'invoice', component:  InvoicesComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
