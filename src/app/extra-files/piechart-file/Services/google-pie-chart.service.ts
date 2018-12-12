import { GoogleChartsBaseService } from './google-charts.base.service';
import { Injectable } from '@angular/core';
import { PieChartConfig } from './../Models/PieChartConfig';

declare var google: any;

@Injectable()
export class GooglePieChartService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildPieChart(elementId1: String, data1: any[], config1: PieChartConfig) : void {  
    var chartFunc = () => { return new google.visualization.PieChart(document.getElementById(<string>elementId1)); };
    var options = {
            title: config1.title,
            sliceVisibilityThreshold:0.000000000000001,
            pieHole: config1.pieHole,
            'backgroundColor': 'transparent',
            'chartArea': {'width': '100%', 'height': '80%'},
            'colors': ['#ef0404', '#3552e0', '#9823a3', '#f9f502', '#0ab223','#efab34'],
            tooltip: { trigger: 'selection',text:'percentage'  },
            pieSliceTextStyle: {
              color: 'black',
            }
      };

    this.buildChart(data1, chartFunc, options);
  }
}