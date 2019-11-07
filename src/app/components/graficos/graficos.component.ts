import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {
  @Input() consolidatedData: any;
  @Input() backgroundColorArray: Array<string> = [
    '#FF7B7C',
    '#FDAA24',
    '#FFDD00',
    '#7DE3DB',
    '#75D6A2',
    '#3d81c5',
    '#ba8bf7',
    '#f94ada'
  ];

  public barChartOptions = {};
  public barChartLabels = [
    'Totalmente insatisfeito',
    'Insatisfeito',
    'Neutro',
    'Satisfeito',
    'Totalmente satisfeito'
  ];
  public barChartType = 'horizontalBar';
  public barChartLegend = false;
  public barChartData = [];

  constructor() {}

  ngOnInit() {
    this.barChartLabels = this.consolidatedData.labels;
    this.barChartData = [
      {
        data: this.consolidatedData.values,
        backgroundColor: this.backgroundColorArray,
        hoverBackgroundColor: this.backgroundColorArray
      }
    ];

    this.barChartOptions = {
      percentages: this.consolidatedData.percentages,
      type: this.consolidatedData.type,
      scaleShowVerticalLines: false,
      responsive: true,
      fill: false,
      scaleBeginAtZero: true,
      scaleStartValue: 0,
      tooltips: {
        enabled: true
      },
      legend: {
        display: true,
        labels: {
          fontColor: 'rgb(255, 99, 132)'
        }
      },
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0,
              suggestedMin: 0
            },
            scaleLabel: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              min: 0
            }
          }
        ]
      },
      animation: {
        onComplete() {
          const chartInstance = this.chart;
          const ctx = chartInstance.ctx;
          ctx.textAlign = 'right';
          ctx.font = 'bold 10px Arial';
          ctx.fillStyle = '#9d0326';
          const greatestValue = chartInstance.options.percentages.reduce(
            function(a: number, b: number) {
              return Math.max(a, b);
            }
          );
          chartInstance.options.percentages.forEach(function(
            data: any,
            index: string | number
          ) {
            const meta = chartInstance.getDatasetMeta(0);
            let posX = meta.data[index]._model.x - 3;
            let posY = meta.data[index]._model.y + 3;
            const showedValue = [data, '%'].join('');
            if (data < greatestValue / 4) {
              posX = posX + 38;
            } else if (data > greatestValue * 4) {
            }
            ctx.fillText(showedValue, posX, posY);
          });
        }
      }
    };
  }
}
