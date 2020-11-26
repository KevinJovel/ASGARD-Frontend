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
  //Variables  
  //Catálogos
  cargos: any;
  sucursales: any;
  areas: any;
  cargo: FormGroup;
  cooperativas: any;
  categorias: any;
  categoria: FormGroup;
  clasificaciones: any;
  clasificacion: FormGroup;
  empleados:any;
  empleado:FormGroup;
  donantes: any;
  donante: FormGroup;
  proveedores: any;
  proveedor: FormGroup;
  tecnicos: any;
  tecnico: FormGroup;
  marcas:any;
  marca:FormGroup;
  

  //Fecha
  fecha=new Date();
  //división de fecha y hora
  anio=this.fecha.getFullYear();
  mes=this.fecha.getMonth()+1;
  dia=this.fecha.getDate();
  hora=this.fecha.getHours();
  minuto=this.fecha.getMinutes();
  segundo= this.fecha.getSeconds();

  //Colores personalizados
  private blackA: string='#000000';
  constructor(private catalogoService: CatalogosService, private _cargarScript: CargarScriptsService,
    private confiService:ConfiguracionService, private http:HttpClient) {
    this._cargarScript.cargar(["/barCode", "/ClearBarcode"]);
    
   }

  ngOnInit(): void {
    this.catalogoService.getCargo().subscribe(data=> {this.cargos=data});
    this.catalogoService.getCategorias().subscribe(data=> {this.categorias=data});
    this.catalogoService.getClasificacion().subscribe(data => { this.clasificaciones = data });
    this.catalogoService.getEmpleado().subscribe(data => { this.empleados = data;});
    this.catalogoService.getDonantes().subscribe(data => { this.donantes = data });
    this.catalogoService.getProveedores().subscribe(res => { this.proveedores = res });
    this.catalogoService.getTecnico().subscribe(data=>{this.tecnicos=data});
    this.catalogoService.getMarcas().subscribe(res => {this.marcas = res});
  }

  pixel(x:number, y: number, color: string) {
    return new Rect([x,y],[516,2]).color(color).end;
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


}
