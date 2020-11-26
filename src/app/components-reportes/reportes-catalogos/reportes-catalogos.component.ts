import { Component, OnInit } from '@angular/core';
import { PdfMakeWrapper, Txt, Img, Columns, Stack, Table, Cell, Canvas, Rect, SVG} from 'pdfmake-wrapper';
import { CatalogosService } from './../../services/catalogos.service';
import { ConfiguracionService } from './../../services/configuracion.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    private confiService:ConfiguracionService, private http:HttpClient) {
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
  }

  sucursalesPDF() {
    this.http.get(environment.urlService+"api/Reporte/sucursalespdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  categoriasPDF() {
    this.http.get(environment.urlService+"api/Reporte/categoriaspdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  clasificacionesPDF() {
    this.http.get(environment.urlService+"api/Reporte/clasificacionespdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  cargosPDF() {
    this.http.get(environment.urlService+"api/Reporte/cargospdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  empleadosPDF() {
    this.http.get(environment.urlService+"api/Reporte/empleadospdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  proveedoresPDF() {
    this.http.get(environment.urlService+"api/Reporte/proveedoresPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  donantesPDF() {
    this.http.get(environment.urlService+"api/Reporte/donantesPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  marcasPDF() {
    this.http.get(environment.urlService+"api/Reporte/marcasPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  tecnicosPDF() {
    this.http.get(environment.urlService+"api/Reporte/tecnicosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  tipoDescargoPDF() {
    this.http.get(environment.urlService+"api/Reporte/tipoDescargoPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  //MÉTODOS PARA REPORTES DE CONTROL DE ACTIVO 
  activosAsigandosPDF() {
    this.http.get(environment.urlService+"api/Reporte/activosAsignadosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  activosNoAsigandosPDF() {
    this.http.get(environment.urlService+"api/Reporte/activosNoAsignadosPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  edificiosInstalacionesPDF() {
    this.http.get(environment.urlService+"api/Reporte/edificiosInstalacionesPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

  activosIntangiblesPDF() {
    this.http.get(environment.urlService+"api/Reporte/activosIntangiblesPdf",{responseType: 'arraybuffer'}).subscribe(pdf=>{
      const blod=new Blob([pdf],{type:"application/pdf"});
      const url= window.URL.createObjectURL(blod);
       window.open(url);
    });
  }

}
