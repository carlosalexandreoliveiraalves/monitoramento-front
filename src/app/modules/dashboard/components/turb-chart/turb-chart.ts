import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MonitorService } from '../../services/monitor';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SensorRecord } from '../../sensor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turb-chart',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './turb-chart.html',
  styleUrl: './turb-chart.css',
})
export class TurbChart implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Turbidez (NTU)',
        fill: true,
        tension: 0.4,
        borderColor: '#609F87', // Cor Primária (Roxo)
        backgroundColor: 'rgba(96, 159, 135, 0.2)',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#609F87',
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
      y: { beginAtZero: false },
      x: { grid: { display: false } }
    }
  };
private monitorService = inject(MonitorService);

  ngOnInit(): void {
    this.carregarDados();
  }

  carregarDados() {
    // CORRIGIDO: Estava chamando Temperature
    this.monitorService.getAllTurbidity().subscribe({
      next: (dados: SensorRecord[]) => {
        // Agora 'dados' é o array puro, graças ao 'map' no service
        const dadosFormatados = dados.slice(-20);

        this.lineChartData.labels = dadosFormatados.map(d =>
          new Date(d.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        );

        this.lineChartData.datasets[0].data = dadosFormatados.map(d => d.value);

        this.chart?.update();
      },
      error: (err) => console.error('Erro turbidez', err)
    });
  }
}