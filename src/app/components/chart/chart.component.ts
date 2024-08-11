import { Component, Input, OnInit } from '@angular/core';
import { AgChartOptions, PixelSize } from 'ag-charts-community'
import { BitcoinValues } from '../../pages/statistic-page/statistic-page.component';
@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss'
})
export class ChartComponent {
  public chartOptions: AgChartOptions
  @Input() data!: BitcoinValues[]
  @Input() chartTitle!: string
  @Input() subTitle!: string

  ngOnInit(): void {
    this.chartOptions.data = this.data
    this.chartOptions.title = {
      text: this.chartTitle
    }
    this.chartOptions.subtitle = {
      text: this.subTitle
    }
  }

  constructor() {
    this.chartOptions = {
      height: 600 as PixelSize,
      width: 750 as PixelSize,
      series: [
        { type: 'line', xKey: 'x', yKey: 'y' },
      ],
      background: {
        fill: 'rgb(239, 239, 239)',
      },
    };
  }
}
