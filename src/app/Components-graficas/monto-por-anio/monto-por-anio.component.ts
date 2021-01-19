import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { GraficasService } from '../../services/graficas.service';
import { Router} from '@angular/router'
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
    { data: [], label: 'Monto de aquisición por año en $', borderWidth: 1, borderColor:'rgba(75, 192, 192, 1)', backgroundColor:'rgba(0, 204, 102, 0.2)'}]
    // { data: [], label: 'Activos registrados', borderWidth: 1 }];
  constructor(private graficasService: GraficasService,private router:Router) { }

  ngOnInit(): void {
    this.graficasService.getDatosGraficaMontoActivosPorAnio().subscribe(res => {
      res.forEach(item => {
        let valor = Math.round(item.monto * 100) / 100;
        valor.toFixed(2);
          this.barChartData[0].data.push(valor);
          this.barChartLabels.push(item.anio);
          this.barChartData[0].backgroundColor = 'rgba(75, 198, 192, 0.2)';
          this.barChartData[0].borderColor = 'rgba(75, 192, 192, 1)';
          this.barChartData[0].hoverBackgroundColor = 'rgba(90, 900, 100, 0.1)'
          this.barChartData[0].hoverBorderColor = 'rgba(75, 192, 192, 1)'
        });
      });
  }
  volver(){
    this.router.navigate(["/app-menu-graficas"]);
  }
 

}