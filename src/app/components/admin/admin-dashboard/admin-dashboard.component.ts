import { Component } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ViewChild, ElementRef } from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HeaderComponent} from "../header.component/header.component";
import {NavbarComponent} from "../navbar.component/navbar.component";
import {VisitorsChartComponent} from "./visitors-chart/visitors-chart.component";
import {MallService} from "../../../services/mall.service/mall.service";
import {StorageUtil} from "../../../utils/storage.util";
import {BoutiqueService} from "../../../services/boutique.service/boutique.service";
import {ConstanteUtil} from "../../../utils/constante.util";
import {BoxeService} from "../../../services/boxe.service/boxe.service";
export interface KPICard {
  title: string;
  value: number | string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
  suffix?: string;
  prefix?: string;
}

export interface StoreVisit {
  storeName: string;
  visits: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, NavbarComponent, VisitorsChartComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  loading = false;
  @ViewChild('donutChartCanvas') donutChartCanvas?: ElementRef<HTMLCanvasElement>;
  idUser = "";
  constructor(
    private centreService: MallService,
    private boutiqueService: BoutiqueService,
    private boxeService: BoxeService
  ) {}
  // KPI Cards
  kpiCards: KPICard[] = [
    {
      title: 'Loyer a jour',
      value: 0,
      change: 12.5,
      changeType: 'increase',
      icon: 'fa-dollar-sign',
      color: '#1A4A54',
      suffix: 'Ar'
    },
    {
      title: 'Loyer en attente',
      value: 0,
      change: -3.2,
      changeType: 'decrease',
      icon: 'fa-clock',
      color: '#ffc326',
      suffix: 'Ar'
    },
    {
      title: 'Boutiques Actives',
      value: 24,
      change: 8.1,
      changeType: 'increase',
      icon: 'fa-store',
      color: '#10b981'
    },
    {
      title: 'Taux d\'Occupation',
      value: 92.5,
      change: 2.3,
      changeType: 'increase',
      icon: 'fa-chart-pie',
      color: '#3b82f6',
      suffix: '%'
    }
  ];

  donutChart?: Chart;

  async ngOnInit(): Promise<void> {
    const auth = StorageUtil.getFromStorage<any>("auth");
    if (auth) {
      this.idUser = auth.idUser;
    }
    await this.loadEtatLoyer();
    await this.loadEtatBoutiques();
    await this.loadEtatOccupation();
  }

  async loadEtatLoyer():Promise<void>{
    const res = await this.centreService.getEtatLoyerMensuel(this.idUser);
    if (res) {
      this.kpiCards[0].value = res.TotalPayer;
      this.kpiCards[1].value = res.TotalNonPayer;
    }
  }

  async loadEtatBoutiques():Promise<void>{
    const res = await this.boutiqueService.getByIdCentreCommercial(this.idUser);
    if (res) {
      this.kpiCards[2].value = res.filter(b => b.status === ConstanteUtil.ETAT_DISPONIBLE).length;
    }
  }

  async loadEtatOccupation():Promise<void>{
    const res = await this.boxeService.getByIdCentreCommercial(this.idUser);
    if (res) {
      const totalBoxe = res.length;
      const occupiedBoxe = res.filter(b => b.status === ConstanteUtil.ETAT_OCCUPEE).length;
      this.kpiCards[3].value = ((occupiedBoxe / totalBoxe) * 100).toFixed(2);
    }
  }

  // Formater les valeurs
  formatValue(card: KPICard): string {
    const value = typeof card.value === 'number'
      ? card.value.toLocaleString('fr-FR')
      : card.value;

    return `${card.prefix || ''} ${value} ${card.suffix || ''}`;
  }

  ngOnDestroy(): void {
    if (this.donutChart) {
      this.donutChart.destroy();
    }
  }

  protected readonly Math = Math;
}
