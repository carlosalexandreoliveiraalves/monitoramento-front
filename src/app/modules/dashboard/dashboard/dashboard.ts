import { TempChart } from '../components/temp-chart/temp-chart';
import { Component, inject, OnInit } from '@angular/core';
import { ChartLastHours } from "../components/chart-last-hours/chart-last-hours";
import { MonitorService } from '../services/monitor';
import { CommonModule } from '@angular/common';
import { PhChart } from '../components/ph-chart/ph-chart';
import { TurbChart } from '../components/turb-chart/turb-chart';

@Component({
  selector: 'app-dashboard',
  imports: [ChartLastHours, CommonModule, PhChart, TempChart, TurbChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

  latestPh: number = 0;
  latestTemp: number = 0;
  latestTurbidity: number = 0;

  private monitorService = inject(MonitorService);


  ngOnInit(): void {
    this.buscarValoresAtuais();
  }

  buscarValoresAtuais() {
    // pH
    this.monitorService.getLatestPh().subscribe(data => {
      this.latestPh = data ? data.value : 0;
    });

    // Temperatura
    this.monitorService.getLatestTemperature().subscribe(data => {
      this.latestTemp = data ? data.value : 0;
    });

    // Turbidez
    this.monitorService.getLatestTurbidity().subscribe(data => {
      this.latestTurbidity = data ? data.value : 0;
    });
  }
}
