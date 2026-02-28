import {Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {Chart, ChartConfiguration, registerables} from 'chart.js';
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf} from "@angular/common";
import {StoreVisit} from "../admin-dashboard.component";
import {MallService} from "../../../../services/mall.service/mall.service";
import {StorageUtil} from "../../../../utils/storage.util";
import {BonDeCommandeCPLModel} from "../../../../models/bon-de-commande.model";
import {ConstanteUtil} from "../../../../utils/constante.util";

Chart.register(...registerables);

export interface VisitorsData {
  date: Date;
  hommes: number;
  femmes: number;
  boutiqueId?: string;
  boutiqueNom?: string;
}

@Component({
  selector: 'app-visitors-chart',
  templateUrl: './visitors-chart.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DatePipe
  ],
  styleUrls: ['./visitors-chart.component.css']
})
export class VisitorsChartComponent implements  AfterViewInit {
  @ViewChild('myChart') myChart?: ElementRef<HTMLCanvasElement>;
  @ViewChild('radarChartCanvas') radarChartCanvas?: ElementRef<HTMLCanvasElement>;

  chart?: Chart;
  dateDebut: Date = (() => {
    const today = new Date();
    const offset = (today.getDay() + 6) % 7; // décalage pour obtenir lundi (0 = dimanche)
    const mon = new Date(today);
    mon.setHours(0, 0, 0, 0);
    mon.setDate(mon.getDate() - offset);
    return mon;
  })();

  dateFin: Date = (() => {
    const today = new Date();
    const offset = (today.getDay() + 6) % 7;
    const mon = new Date(today);
    mon.setHours(0, 0, 0, 0);
    mon.setDate(mon.getDate() - offset);
    const sun = new Date(mon);
    sun.setDate(sun.getDate() + 6);
    sun.setHours(23, 59, 59, 999);
    return sun;
  })();

  listChoixAffichage: string[] = ['jounalier', 'hebdomadaire', 'mensuel'];
  choixAffichage: string = 'jounalier';
  labels: any = [];
  data: any[][] = [];
  visitorsData: VisitorsData[] = [];

  storeVisits: StoreVisit[] = [];

  radarChart?: Chart;

  constructor(
    private centreService: MallService
  ) {}

  ngOnInit(): void {
    this.labels["jounalier"] = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
    this.labels["hebdomadaire"] = ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4"];
    this.labels["mensuel"] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    this.loadVisitorsData();
    this.initializeData();
  }

  async loadVisitorsData():Promise<void>{
    // Simuler le chargement des données
    // this.visitorsData = [
    //   { date: new Date('2026-02-23'), hommes: 100, femmes: 120, boutiqueId: '1', boutiqueNom: 'Samsung' },
    //   { date: new Date('2026-02-23'), hommes: 80, femmes: 90, boutiqueId: '2', boutiqueNom: 'Nike' },
    //   { date: new Date('2026-02-24'), hommes: 150, femmes: 130, boutiqueId: '3', boutiqueNom: 'Apple' },
    //   { date: new Date('2026-02-26'), hommes: 70, femmes: 60, boutiqueId: '4', boutiqueNom: 'Zara' },
    //   { date: new Date('2026-02-25'), hommes: 50, femmes: 40, boutiqueId: '5', boutiqueNom: 'Home Depot' },
    //   { date: new Date('2026-02-24'), hommes: 90, femmes: 110, boutiqueId: '6', boutiqueNom: 'Sephora' },
    //   { date: new Date('2026-02-27'), hommes: 120, femmes: 140, boutiqueId: '1', boutiqueNom: 'Samsung' },
    //   { date: new Date('2026-02-28'), hommes: 60, femmes: 80, boutiqueId: '2', boutiqueNom: 'Nike' },
    //   { date: new Date('2026-02-23'), hommes: 130, femmes: 150, boutiqueId: '3', boutiqueNom: 'Apple' },
    //   { date: new Date('2026-02-25'), hommes: 40, femmes: 30, boutiqueId: '4', boutiqueNom: 'Zara' },
    //   { date: new Date('2026-02-24'), hommes: 30, femmes: 20, boutiqueId: '5', boutiqueNom: 'Home Depot' },
    //   { date: new Date('2026-02-27'), hommes: 80, femmes: 100, boutiqueId: '6', boutiqueNom: 'Sephora' }
    // ];
    const auth = StorageUtil.getFromStorage<any>("auth");
    const res = await this.centreService.getVisiteurs(auth.idUser);
    console.log("Données des visiteurs récupérées :", res);
    if (res) {
      const uniqueBoutiques = new Map<string, string>();
      res.forEach((d: BonDeCommandeCPLModel) => {
        const id = d.boutique?._id;
        if (id) {
          const nom = d.boutique?.nom ?? `Boutique ${id}`;
          if (!uniqueBoutiques.has(id)) {
            uniqueBoutiques.set(id, nom);
          }
        }
      });
      console.log("Boutiques uniques identifiées :", Array.from(uniqueBoutiques, ([id, nom]) => ({ id, nom })));

      uniqueBoutiques.forEach((nom, id) => {

        const visites = res
          .filter((d: BonDeCommandeCPLModel) => d.boutique?._id === id)
          .sort((x, y) => {
            const dx = x.date ? new Date(x.date).getTime() : 0;
            const dy = y.date ? new Date(y.date).getTime() : 0;
            return dx - dy;
          });

        const uniqueDates = new Set<number>();
        visites.forEach((d: BonDeCommandeCPLModel) => {
          if (d.date) {
            const dateOnly = new Date(d.date);
            dateOnly.setHours(0, 0, 0, 0);
            const ts = dateOnly.getTime();
            if (!uniqueDates.has(ts)) {
              uniqueDates.add(ts);
            }
          }
        });

        uniqueDates.forEach(ts => {
          const visitesOnDate = visites.filter((d: BonDeCommandeCPLModel) => {
            if (!d.date) return false;
            const dDateOnly = new Date(d.date);
            dDateOnly.setHours(0, 0, 0, 0);
            return dDateOnly.getTime() === ts;
          });
          const hommes = visitesOnDate.filter(d=> d.client?.sexe === ConstanteUtil.sexe.Homme).length;
          const femmes = visitesOnDate.filter(d=> d.client?.sexe === ConstanteUtil.sexe.Femme).length;
          this.visitorsData.push({
            date: new Date(ts),
            hommes,
            femmes,
            boutiqueId: id,
            boutiqueNom: nom
          });
        });
      });
    }
    console.log("Données des visiteurs traitées :", this.visitorsData);
  }


  ngAfterViewInit(): void {
      this.initChart();
      this.initRadarChart();
  }

  generateDate2D(): any{
    let start = new Date(this.dateDebut);
    if (this.choixAffichage === "jounalier") {
      const result: any[][] = [];
      for (let i=0; i < this.labels["jounalier"].length; i++) {
        let min = new Date(start);
        let max = new Date(start);
        result.push([min,max]);
        start.setDate(start.getDate() + 1);
      }
      return result;
    }
    if (this.choixAffichage === "hebdomadaire") {
      const result: any[][] = [];
      for (let i=0; i < this.labels["hebdomadaire"].length; i++) {
        let min = new Date(start);
        let max = new Date(start);
        max.setDate(max.getDate() + 6);
        result.push([min,max]);
        start.setDate(start.getDate() + 7);
      }
      return result;
    }
    if (this.choixAffichage === "mensuel") {
      const result: any[][] = [];
      for (let i=0; i < this.labels["mensuel"].length; i++) {
        let min = new Date(start);
        let max = new Date(start);
        max.setMonth(max.getMonth() + 1);
        max.setDate(max.getDate() - 1);
        result.push([min,max]);
        start.setMonth(start.getMonth() + 1);
      }
      return result;
    }
  }

  initializeData(): void {
    let start = new Date(this.dateDebut);
    let end = new Date(this.dateFin);
    if (start > end) { const tmp = start; start = end; end = tmp; }

    // Filtrer les données dans l'intervalle
    const filtered = this.visitorsData.filter(d => {
      const dt = new Date(d.date);
      return dt >= start && dt <= end;
    });


    const storeMap = new Map<string, StoreVisit>();
    for (const d of filtered) {
      const key = d.boutiqueId ?? d.boutiqueNom ?? 'unknown';
      const name = d.boutiqueNom ?? (`Boutique ${d.boutiqueId ?? 'inconnue'}`);
      const visits = (d.hommes ?? 0) + (d.femmes ?? 0);
      if (storeMap.has(key)) {
        storeMap.get(key)!.visits += visits;
      } else {
        storeMap.set(key, { storeName: name, visits });
      }
    }
    this.storeVisits = Array.from(storeMap.values());

    const dateRanges = this.generateDate2D();
    const hommesData: number[] = [];
    const femmesData: number[] = [];
    const totalData: number[] = [];
    for (let i=0; i < dateRanges.length; i++) {
      const range = dateRanges[i];
      const hommes = filtered.filter(d => {
        const dt = new Date(d.date);
        const dtOnly = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime();
        const startOnly = new Date(range[0].getFullYear(), range[0].getMonth(), range[0].getDate()).getTime();
        const endOnly = new Date(range[1].getFullYear(), range[1].getMonth(), range[1].getDate()).getTime();
        return dtOnly >= startOnly && dtOnly <= endOnly;
      }).reduce((sum, d) => sum + d.hommes, 0);

      const femmes = filtered.filter(d => {
        const dt = new Date(d.date);
        const dtOnly = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime();
        const startOnly = new Date(range[0].getFullYear(), range[0].getMonth(), range[0].getDate()).getTime();
        const endOnly = new Date(range[1].getFullYear(), range[1].getMonth(), range[1].getDate()).getTime();
        return dtOnly >= startOnly && dtOnly <= endOnly;
      }).reduce((sum, d) => sum + d.femmes, 0);
      hommesData.push(hommes);
      femmesData.push(femmes);
      totalData.push(hommes + femmes);
    }
    this.data[0] = hommesData;
    this.data[1] = femmesData;
    this.data[2] = totalData;
  }

  initChart(): void {
    console.log("Initialisation du graphique avec les données :", this.data);
    if (!this.myChart) return;

    const ctx = this.myChart.nativeElement.getContext('2d');
    if (!ctx) return;

    // this.chart = new Chart(ctx, {
    //   type: 'bar',
    //   data: {
    //     labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    //     datasets: [{
    //         label: 'Homme',
    //         data: [12, 19, 3, 5, 2, 3],
    //         borderColor: '#1A4A54',
    //         backgroundColor: 'rgba(0,140,255,0.93)',
    //         // tension: 0.4
    //       },
    //       {
    //         label: 'Femme',
    //         data: [12, 19, 3, 5, 2, 3],
    //         borderColor: '#1A4A54',
    //         backgroundColor: 'rgba(255,0,139,0.87)',
    //         // tension: 0.4
    //     }]
    //   },
    //   options: {
    //     responsive: true,
    //     maintainAspectRatio: true
    //   }
    // });
    this.chart = new Chart(ctx, {
      type: 'bar', // Type principal
      data: {
        labels: this.labels[this.choixAffichage], // Labels dynamiques selon le choix d'affichage
        datasets: [
          {
            // Dataset BAR (Ventes réelles)
            type: 'bar',
            label: 'Total',
            data: this.data[2], // Utiliser les données totales
            backgroundColor: '#1A4A54',
            borderColor: '#1A4A54',
            borderWidth: 1,
            order: 2 // Ordre d'affichage (2 = derrière)
          },
          {
            // Dataset LINE (Objectif)
            type: 'line',
            label: 'Homme',
            data: this.data[0], // Utiliser les données hommes
            borderColor: 'rgba(68,148,239,0.83)',
            backgroundColor: 'rgba(68,154,239,0.1)',
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 7,
            order: 1 // Ordre d'affichage (1 = devant)
          },
          {
            // Dataset LINE 2 (Tendance)
            type: 'line',
            label: 'Femme',
            data: this.data[1], // Utiliser les données femmes
            borderColor: 'rgb(255,70,188)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5, 5], // Ligne pointillée
            fill: false,
            tension: 0.4,
            pointRadius: 0, // Pas de points
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: false,
            text: 'Performance des Ventes vs Objectifs',
            font: {
              size: 16,
              weight: 'bold'
            },
            color: '#0f1111'
          },
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: {
                size: 13
              }
            }
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: (context) => {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                // @ts-ignore
                label += context.parsed.y.toLocaleString('fr-FR');
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => {
                return value.toLocaleString('fr-FR');
              }
            },
            grid: {
              color: '#e5e7eb'
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  initRadarChart(): void {
    if (!this.radarChartCanvas) return;

    const ctx = this.radarChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'radar'> = {
      type: 'radar',
      data: {
        labels: this.storeVisits.map(s => s.storeName),
        datasets: [{
          label: 'Visiteurs',
          data: this.storeVisits.map(s => s.visits),
          fill: true,
          backgroundColor: 'rgba(26, 74, 84, 0.2)',
          borderColor: '#1A4A54',
          pointBackgroundColor: '#1A4A54',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#1A4A54',
          borderWidth: 3,
          pointRadius: 5,
          pointHoverRadius: 7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            beginAtZero: true,
            ticks: {
              stepSize: 200,
              font: {
                size: 11
              }
            },
            pointLabels: {
              font: {
                size: 13,
                weight: 600
              },
              color: '#0f1111'
            },
            grid: {
              color: '#e5e7eb'
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 12,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            callbacks: {
              label: (context) => {
                return `Visiteurs: ${context.parsed.r}`;
              }
            }
          }
        }
      }
    };

    this.radarChart = new Chart(ctx, config);
  }

  changeAffichage(): void {
    if (this.choixAffichage === "jounalier") {
      this.dateDebut = (() => {
        const today = new Date();
        const offset = (today.getDay() + 6) % 7; // décalage pour obtenir lundi (0 = dimanche)
        const mon = new Date(today);
        mon.setHours(0, 0, 0, 0);
        mon.setDate(mon.getDate() - offset);
        return mon;
      })();

      this.dateFin = (() => {
        const today = new Date();
        const offset = (today.getDay() + 6) % 7;
        const mon = new Date(today);
        mon.setHours(0, 0, 0, 0);
        mon.setDate(mon.getDate() - offset);
        const sun = new Date(mon);
        sun.setDate(sun.getDate() + 6);
        sun.setHours(23, 59, 59, 999);
        return sun;
      })();
    }
    if (this.choixAffichage === "hebdomadaire") {
      this.dateDebut = (() => {
        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        return firstDayOfMonth;
      })();

      this.dateFin = (() => {
        const today = new Date();
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        lastDayOfMonth.setHours(23, 59, 59, 999);
        return lastDayOfMonth;
      })();
    }
    if (this.choixAffichage === "mensuel") {
      this.dateDebut = (() => {
        const today = new Date();
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        return firstDayOfYear;
      })();

      this.dateFin = (() => {
        const today = new Date();
        const lastDayOfYear = new Date(today.getFullYear(), 11, 31);
        lastDayOfYear.setHours(23, 59, 59, 999);
        return lastDayOfYear;
      })();
    }
    this.updateChart();
  }

  updateChart(): void {
    this.initializeData();
    if (this.chart) {
      this.chart.data.labels = this.labels[this.choixAffichage];
      this.chart.data.datasets[0].data = this.data[2]; // Total
      this.chart.data.datasets[1].data = this.data[0]; // Homme
      this.chart.data.datasets[2].data = this.data[1]; // Femme
      this.chart.update();
    }
    if (this.radarChart) {
      this.radarChart.data.labels = this.storeVisits.map(s => s.storeName);
      this.radarChart.data.datasets[0].data = this.storeVisits.map(s => s.visits);
      this.radarChart.update();
    }
  }

  nextDate(): void {
    if (this.choixAffichage === "jounalier") {
      const newStart = new Date(this.dateDebut);
      newStart.setDate(newStart.getDate() + 7);
      newStart.setHours(0, 0, 0, 0);
      const newEnd = new Date(newStart);
      newEnd.setDate(newStart.getDate() + 6);
      newEnd.setHours(23, 59, 59, 999);
      this.dateDebut = newStart;
      this.dateFin = newEnd;
    } else if (this.choixAffichage === "hebdomadaire") {
      const newStart = new Date(this.dateFin);
      newStart.setDate(newStart.getDate() + 1);
      newStart.setHours(0, 0, 0, 0);
      const newEnd = new Date(newStart.getFullYear(), newStart.getMonth() + 1, 0);
      newEnd.setHours(23, 59, 59, 999);
      this.dateDebut = newStart;
      this.dateFin = newEnd;
    } else if (this.choixAffichage === "mensuel") {
      const year = this.dateDebut.getFullYear() + 1;
      const newStart = new Date(year, 0, 1);
      newStart.setHours(0, 0, 0, 0);
      const newEnd = new Date(year, 11, 31);
      newEnd.setHours(23, 59, 59, 999);
      this.dateDebut = newStart;
      this.dateFin = newEnd;
    }
    this.updateChart();
  }

  previousDate(): void {
    if (this.choixAffichage === "jounalier") {
      const newStart = new Date(this.dateDebut);
      newStart.setDate(newStart.getDate() - 7);
      newStart.setHours(0, 0, 0, 0);
      const newEnd = new Date(newStart);
      newEnd.setDate(newStart.getDate() + 6);
      newEnd.setHours(23, 59, 59, 999);
      this.dateDebut = newStart;
      this.dateFin = newEnd;
    } else if (this.choixAffichage === "hebdomadaire") {
      const newEnd = new Date(this.dateDebut);
      newEnd.setDate(newEnd.getDate() - 1);
      newEnd.setHours(23, 59, 59, 999);
      const newStart = new Date(newEnd.getFullYear(), newEnd.getMonth(), 1);
      newStart.setHours(0, 0, 0, 0);
      this.dateDebut = newStart;
      this.dateFin = newEnd;
    } else if (this.choixAffichage === "mensuel") {
      const year = this.dateDebut.getFullYear() - 1;
      const newStart = new Date(year, 0, 1);
      newStart.setHours(0, 0, 0, 0);
      const newEnd = new Date(year, 11, 31);
      newEnd.setHours(23, 59, 59, 999);
      this.dateDebut = newStart;
      this.dateFin = newEnd;
    }
    this.updateChart();
  }
  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  getSubtitle(): string {
    return `Nombre de visiteurs ${this.choixAffichage === 'jounalier' ? 'par jour' : this.choixAffichage === 'hebdomadaire' ? 'par semaine' : 'par mois'} du ${new Date(this.dateDebut).toLocaleDateString('fr-FR')} au ${new Date(this.dateFin).toLocaleDateString('fr-FR')}`;
  }
}
