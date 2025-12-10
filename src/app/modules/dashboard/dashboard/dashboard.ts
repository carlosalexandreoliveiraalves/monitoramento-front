import { TempChart } from '../components/temp-chart/temp-chart';
import { Component, inject, OnInit } from '@angular/core';
import { ChartLastHours } from "../components/chart-last-hours/chart-last-hours";
import { MonitorService } from '../services/monitor';
import { CommonModule } from '@angular/common';
import { PhChart } from '../components/ph-chart/ph-chart';
import { TurbChart } from '../components/turb-chart/turb-chart';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, PhChart, TempChart, TurbChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  private monitorService = inject(MonitorService);

  // Agora são Observables (terminam com $)
  // Eles guardam o fluxo de dados, não apenas o valor estático
  latestPh$: Observable<number> = of(0);
  latestTemp$: Observable<number> = of(0);
  latestTurbidity$: Observable<number> = of(0);

  ngOnInit(): void {
    this.iniciarMonitoramento();
  }

  iniciarMonitoramento() {
    // Configura o fluxo do pH
    this.latestPh$ = this.monitorService.getLatestPh().pipe(
      map(data => data && data.value ? data.value : 0),
      catchError(() => of(0)) // Se der erro, mostra 0
    );

    // Configura o fluxo da Temperatura
    this.latestTemp$ = this.monitorService.getLatestTemperature().pipe(
      map(data => data && data.value ? data.value : 0),
      catchError(() => of(0))
    );

    // Configura o fluxo da Turbidez
    this.latestTurbidity$ = this.monitorService.getLatestTurbidity().pipe(
      map(data => data && data.value ? data.value : 0),
      catchError(() => of(0))
    );
  }
}