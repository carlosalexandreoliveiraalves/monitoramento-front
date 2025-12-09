import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart-last-hours',
  imports: [BaseChartDirective],
  templateUrl: './chart-last-hours.html',
  styleUrl: './chart-last-hours.css',
})
export class ChartLastHours implements OnInit {

  dadosMongo = [
    { createdAt: '2023-12-01T10:00:00', valor: 120 },
    { createdAt: '2023-12-01T10:30:00', valor: 145 },
    { createdAt: '2023-12-01T11:00:00', valor: 132 },
    { createdAt: '2023-12-01T11:30:00', valor: 180 },
    { createdAt: '2023-12-01T12:00:00', valor: 110 },
    { createdAt: '2023-12-01T12:30:00', valor: 90 },
  ];

  ngOnInit(): void {
    // Simulação: Transformar dados do Mongo para o formato do Chart.js
    // Seus dados do Mongo provavelmente virão como Array de Objetos:
    // [{ createdAt: '2023-10-01T10:00:00', valor: 50 }, ...]
    if (this.dadosMongo.length > 0) {
      this.atualizarGrafico();
    }
  }


  //COnfigurações de como os dados vão aparecer:
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [], // Eixo X (Tempo)
    datasets: [
      {
        data: [], // Eixo Y (Valores)
        label: 'Medições realizadas',
        fill: true, // Preencher área abaixo da linha?
        tension: 0.4, // Curvatura da linha (0 = reta, 0.4 = suave)
        borderColor: 'rgb(59, 130, 246)', // Azul Tailwind (blue-500)
        backgroundColor: 'rgba(59, 130, 246, 0.2)', // Azul transparente
        pointBackgroundColor: '#fff',
        pointBorderColor: 'rgb(59, 130, 246)',
      }
    ]
  };


  // Configurações visuais do gráfico:
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // IMPORTANTE para o Tailwind controlar a altura
    
    animation: {
      duration: 1000, // duração em ms
      easing: 'easeOutQuart'
    },

    plugins: {
      legend: {
        display: true, position: 'bottom', labels: {
          font: { size: 14, family: 'MuseoModerno' }, // Fonte customizada
          color: '#4b5563' // Cor do texto (gray-600 do Tailwind)
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#f3f4f6' } // Linhas de grade cinza claro
      },
      x: {
        grid: { display: false } // Remove grade vertical para visual mais limpo
      }
    }
  };

  chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Account A'
    },
    {
      data: [120, 455, 100, 340],
      label: 'Account B'
    },
    {
      data: [45, 67, 800, 500],
      label: 'Account C'
    }
  ];

  atualizarGrafico() {
    // Extrai as datas para o Eixo X
    this.lineChartData.labels = this.dadosMongo.map(item => {
      const data = new Date(item.createdAt);
      return data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    });

    // Extrai os valores para o Eixo Y
    this.lineChartData.datasets[0].data = this.dadosMongo.map(item => item.valor);
  }
}
