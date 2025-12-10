import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MonitorService } from '../../services/monitor';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SensorRecord } from '../../sensor.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ph-chart',
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './ph-chart.html',
  styleUrl: './ph-chart.css',
})
export class PhChart implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'pH',
        fill: true,
        tension: 0.4,
        borderColor: '#87609F', // Cor Primária (Roxo)
        backgroundColor: 'rgba(135, 96, 159, 0.2)',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#87609F',
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
    this.monitorService.getAllPh().subscribe({
      next: (dados: SensorRecord[]) => {
        // Assume-se que o back retorna ordenado ou você ordena aqui
        // Filtra para pegar apenas os últimos X registros ou todos
        const dadosFormatados = dados.slice(-20); // Ex: pegar os ultimos 20 pontos

        this.lineChartData.labels = dadosFormatados.map(d =>
          new Date(d.timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
        );

        this.lineChartData.datasets[0].data = dadosFormatados.map(d => d.value);

        this.chart?.update();
      },
      error: (err) => console.error('Erro ao buscar dados de pH', err)
    });
  }
}
