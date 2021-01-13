import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { GraficasService } from '../../services/graficas.service';
@Component({
  selector: 'app-activos-por-anio',
  templateUrl: './activos-por-anio.component.html',
  styleUrls: ['./activos-por-anio.component.css']
})
export class ActivosPorAnioComponent implements OnInit {
  chart = [];
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
    { data: [], label: 'Activos registrados', borderWidth: 1,}]
    // { data: [], label: 'Activos registrados', borderWidth: 1 }];
  constructor(private graficasService: GraficasService) { }

  ngOnInit(): void {
    this.graficasService.getDatosGraficaActivosPorAnio().subscribe(res => {
      console.log(res);
      res.forEach(item => {
         console.log(item.anio);
         this.barChartData[0].data.push(item.numero);
         this.barChartLabels.push(item.anio);
         this.barChartData[0].backgroundColor = 'rgba(0, 204, 102, 0.2)';
         this.barChartData[0].borderColor = 'rgba(75, 192, 192, 1)';
         this.barChartData[0].hoverBackgroundColor = 'rgba(90, 900, 100, 0.1)'
         this.barChartData[0].hoverBorderColor = 'rgba(75, 192, 192, 1)'
       });
      });
      // console.log(this.barChartData[0].data);

    //  this.barChartLabels.push('2009');
    //  this.barChartData[0].data.push(10);
    // this.barChartLabels.push('2010');
  }
  generarNumero(numero){
    return (Math.random()*numero).toFixed(0);
  }
  colorRGB(){
    var coolor = "("+this.generarNumero(255)+"," + this.generarNumero(255) + "," + this.generarNumero(255) +")";
    return "rgb" + coolor;
  }


}
