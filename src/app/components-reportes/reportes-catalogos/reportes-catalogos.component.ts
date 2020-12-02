import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Img, Columns, Stack, Table, Cell, Canvas, Rect, SVG} from 'pdfmake-wrapper';
import { CatalogosService } from './../../services/catalogos.service';
import { ConfiguracionService } from './../../services/configuracion.service';
import { UsuarioService } from './../../services/usuario.service';
import {HttpClient} from '@angular/common/http'
import { CargarScriptsService } from './../../services/cargar-scripts.service';
import {environment} from '../../../environments/environment';
import {saveAs} from 'file-saver/dist/FileSaver';

@Component({
  selector: 'app-reportes-catalogos',
  templateUrl: './reportes-catalogos.component.html',
  styleUrls: ['./reportes-catalogos.component.css']
})
export class ReportesCatalogosComponent implements OnInit {

  constructor(private catalogoService: CatalogosService, private _cargarScript: CargarScriptsService,
    private confiService:ConfiguracionService, private http:HttpClient,private usuarioService:UsuarioService) {
    this._cargarScript.cargar(["/barCode", "/ClearBarcode"]);
    
   }

  ngOnInit(): void {
  }

  dowloadPDF() {
    this.http.get(environment.urlService+"api/Reporte/reporte",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const fileName='prueba.pdf';
      saveAs(blod,fileName);
    });
  }

  //MÉTODOS PARA LOS REPORTES DE CATÁLOGOS
  areasDeNegocioPDF() {
    this.http.get(environment.urlService+"api/Reporte/areasDeNegociopdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de áreas de negocio.`).subscribe();
  }

  sucursalesPDF() {
    this.http.get(environment.urlService+"api/Reporte/sucursalespdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de sucursales.`).subscribe();
  }

  categoriasPDF() {
    this.http.get(environment.urlService+"api/Reporte/categoriaspdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de categorías de activos.`).subscribe();
  }

  clasificacionesPDF() {
    this.http.get(environment.urlService+"api/Reporte/clasificacionespdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de clasificaciones de activos.`).subscribe();
  }

  cargosPDF() {
    this.http.get(environment.urlService+"api/Reporte/cargospdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de cargos.`).subscribe();
  }

  empleadosPDF() {
    this.http.get(environment.urlService+"api/Reporte/empleadospdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de empleados.`).subscribe();
  }

  proveedoresPDF() {
    this.http.get(environment.urlService+"api/Reporte/proveedoresPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de proveedores.`).subscribe();
  }

  donantesPDF() {
    this.http.get(environment.urlService+"api/Reporte/donantesPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de donantes.`).subscribe();
  }

  marcasPDF() {
    this.http.get(environment.urlService+"api/Reporte/marcasPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de marcas.`).subscribe();
  }

  tecnicosPDF() {
    this.http.get(environment.urlService+"api/Reporte/tecnicosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de técnicos.`).subscribe();
  }

  tipoDescargoPDF() {
    this.http.get(environment.urlService+"api/Reporte/tipoDescargoPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de tipo de descargos.`).subscribe();
  }

  //MÉTODOS PARA REPORTES DE CONTROL DE ACTIVO 
  activosAsigandosPDF() {
    this.http.get(environment.urlService+"api/Reporte/activosAsignadosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de activos asignados.`).subscribe();
  }

  activosNoAsigandosPDF() {
    this.http.get(environment.urlService+"api/Reporte/activosNoAsignadosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de activos no asignados.`).subscribe();
  }

  edificiosInstalacionesPDF() {
    this.http.get(environment.urlService+"api/Reporte/edificiosInstalacionesPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de activos tipo edificios o instalaciones.`).subscribe();
  }

  activosIntangiblesPDF() {
    this.http.get(environment.urlService+"api/Reporte/activosIntangiblesPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de activos tipo intagibles.`).subscribe();
  }

  cuadroControlActivosPDF() {
    this.http.get(environment.urlService+"api/Reporte/cuadroControlActivosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de cuadro de control de activos.`).subscribe();
  }

  cuadroControlEdificiosPDF() {
    this.http.get(environment.urlService+"api/Reporte/cuadroControlEdificiosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de cuadro de control de activos edificios.`).subscribe();
  }

  cuadroControlIntangiblesPDF() {
    this.http.get(environment.urlService+"api/Reporte/cuadroControlIntangiblesPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de cuadro de control de activos intangibles.`).subscribe();
  }

  //REPORTES DE MANTENIMIENTO
  solicitudesmantenimientopdf() {
    this.http.get(environment.urlService+"api/ReportesMantenimiento/solicitudesmantenimientopdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de solicitudes de mantenimiento.`).subscribe();
  }
  activosenmantenimientopdf() {
    this.http.get(environment.urlService+"api/ReportesMantenimiento/activosenmantenimientopdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de activos en mantenimiento.`).subscribe();
  }
  informesmantenimientopdf() {
    this.http.get(environment.urlService+"api/ReportesMantenimiento/informesmantenimientopdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de informes de mantenimiento.`).subscribe();
  }

  //Reporte de traspasos
  solicitudestraspasopdf() {
    this.http.get(environment.urlService+"api/ReportesTraspaso/solicitudestraspasopdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Imprimió un reporte de solicitudes de traspasos.`).subscribe();
  }


  

}
