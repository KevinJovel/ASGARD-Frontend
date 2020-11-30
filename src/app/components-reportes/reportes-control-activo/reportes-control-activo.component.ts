import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http'
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-reportes-control-activo',
  templateUrl: './reportes-control-activo.component.html',
  styleUrls: ['./reportes-control-activo.component.css']
})
export class ReportesControlActivoComponent implements OnInit {

  constructor(private http:HttpClient,private usuarioService:UsuarioService) { }

  ngOnInit(): void {
  }

  //MÉTODOS PARA LOS REPORTES DE CONTROL DE ACTIVOS

  activosAsigandosPDF() {
    this.http.get(environment.urlService+"api/Reporte/activosAsignadosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de activos asignados.`).subscribe();
  }

}
