import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { GraficasService } from '../../services/graficas.service';
@Component({
  selector: 'app-monto-por-anio',
  templateUrl: './monto-por-anio.component.html',
  styleUrls: ['./monto-por-anio.component.css']
})
export class MontoPorAnioComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Monto de aquisición por año en $', borderWidth: 1,}]
    // { data: [], label: 'Activos registrados', borderWidth: 1 }];
  constructor(private graficasService: GraficasService) { }

  ngOnInit(): void {
    this.graficasService.getPeriodos().subscribe(data => {
      data.forEach(item => {
        console.log(item.anio);
       this.graficasService.getDatosGraficaMontoActivosPorAnio(item.anio).subscribe(res => {
         console.log(res.monto);
         setTimeout(() => {
          this.barChartData[0].data.push(res.monto);
          this.barChartLabels.push(res.anio);
         }, 500);
          
          this.barChartData[0].backgroundColor = 'rgba(75, 198, 192, 0.2)';
          this.barChartData[0].borderColor = 'rgba(75, 192, 192, 1)';
          this.barChartData[0].hoverBackgroundColor = 'rgba(90, 900, 100, 0.1)'
          this.barChartData[0].hoverBorderColor = 'rgba(75, 192, 192, 1)'
        });
      });
      console.log(this.barChartData[0].data);

    });

  }

}
