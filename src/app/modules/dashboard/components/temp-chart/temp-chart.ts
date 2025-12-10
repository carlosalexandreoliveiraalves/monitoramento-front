import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SensorRecord } from '../../sensor.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { MonitorService } from '../../services/monitor';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-temp-chart',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './temp-chart.html',
  styleUrl: './temp-chart.css',
})
export class TempChart implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Temperatura (°C)', // <--- CORRIGIDO
        fill: true,
        tension: 0.4,
        borderColor: '#bb2124', // Cor Danger (Vermelho)
        backgroundColor: 'rgba(187, 33, 36, 0.2)',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#bb2124',
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 1000, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: true, position: 'bottom' }
    },
    scales: {
      y: { beginAtZero: false }, // pH geralmente não começa do zero visualmente interessante
      x: { grid: { display: false } }
    }
  };
  private monitorService = inject(MonitorService);

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    // CORRIGIDO: Estava chamando Turbidity
    this.monitorService.getAllTemperature().subscribe({
      next: (dados: SensorRecord[]) => {
        const dadosFormatados = dados.slice(-20);

        this.lineChartData.labels = dadosFormatados.map(d =>
          new Date(d.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        );

        this.lineChartData.datasets[0].data = dadosFormatados.map(d => d.value);

        this.chart?.update();
      },
      error: (err) => console.error('Erro temperatura', err)
    });
  }
}