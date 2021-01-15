import { Component, OnInit } from '@angular/core';
import { DepreciacionService } from '../../services/depreciacion.service';
import { Router} from '@angular/router'
@Component({
  selector: 'app-menu-graficas',
  templateUrl: './menu-graficas.component.html',
  styleUrls: ['./menu-graficas.component.css']
})
export class MenuGraficasComponent implements OnInit {
  displayGraficas = 'none';
  cooperativa: string;
  constructor(private depreciacionService: DepreciacionService,private router:Router) { }

  ngOnInit(): void {
    this.displayGraficas = 'block';
    this.depreciacionService.DatosCierre().subscribe(data => {
      this.cooperativa = data.cooperativa;
    });
  }
  close(){
    this.displayGraficas='none';
    this.router.navigate(["/"]);
  }
  GraficaActivosAquiridosPorAnio(){
    this.router.navigate(["/graph-activos-anio"]);
  }
  GraficaMontoActivosAquiridosPorAnio(){
    this.router.navigate(["/graph-monto-anio"]);
  }
  GastosMattoPorAnio(){
    this.router.navigate(["/graph-gastos-monto-anio"]);
  }
}
