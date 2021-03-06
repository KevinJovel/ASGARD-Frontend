import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import { DepreciacionService } from './../../services/depreciacion.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ExcelService } from './../../excel.service';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-report-tarjeta',
  templateUrl: './report-tarjeta.component.html',
  styleUrls: ['./report-tarjeta.component.css']
})
export class ReportTarjetaComponent implements OnInit {
  display = 'none';
  displayDatosMuebles='none';
  displayDatosEdificios='none';
  bienes: any;
  datosExcel:any;
  sucursales: any;
  areas:any;
  Datos:any;
  p: number=1;
  parametro: any;
  parametro2: any;
  tipo:any;
  //Variables para objeto que viene de peticion get
  fecha:string;
  descripcion:string;
  codigo:string;
  valor:string;
prima:string
cuota:string;
plazo:string;
interes:string;
proveedor:string;
direccion:string;
telefono:string;
color:string;
marca:string;
modelo:string;
noSerie:string;
vidaUtil:string;
tasa:string;
valorresidual:string;
observaciones:string;

datoss: any;

ProvDon:string;
  constructor(private catalogosServices: CatalogosService,private depreciacionService:DepreciacionService, private route: Router, private activateRoute: ActivatedRoute, private http:HttpClient,
    private usuarioService:UsuarioService, private excelService: ExcelService) {
  
    this.activateRoute.params.subscribe(parametro => {
      this.parametro = parametro["id"];
      this.parametro2 = parametro["tipo"];
  });
  }

  //Para archivo Excel
datos: any;

  ngOnInit(): void {


    this.datos=[
      
      this.depreciacionService.DatosTarjeta(this.parametro).subscribe(data=>{
        data.fechaAdquicicion
      })
    ]


    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Consultó la tarjeta de depreciación de activos.`).subscribe();
      this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursales=data});
     if(this.parametro2==1) {
       this.displayDatosEdificios='none';
      this.depreciacionService.DatosTarjeta(this.parametro).subscribe(data=>{
        
        if(data.isProvDon==1){
          this.ProvDon="Proveedor";
        }else{
          this.ProvDon="Donante";
        }
        this.fecha=data.fechaAdquicicion;
        this.codigo=data.codigo;
        this.descripcion=data.descripcion;
        this.valor=data.valor;
        this.prima=data.prima;
        this.cuota=data.cuota;
        this.plazo=data.plazo;
        this.interes=data.interes;
        this.proveedor=data.proveedor;
        this.direccion=data.direccion;
        this.telefono=data.telefono;
        this.color=data.color;
        this.marca=data.marca;
        this.modelo=data.modelo;
        this.noSerie=data.noSerie;
        this.vidaUtil=data.vidaUtil;
        this.tasa=data.tasaAnual;
        this.valorresidual=data.valorResidual;
        this.observaciones=data.observaciones;
        this.displayDatosMuebles='block';
        });
     } else {
       this.displayDatosMuebles='none';
       this.depreciacionService.DatosTarjetaEdificiosIntangibles(this.parametro).subscribe(data=>{
        if(data.isProvDon==1){
          this.ProvDon="Proveedor";
        }else{
          this.ProvDon="Donante";
        }
        this.fecha=data.fechaAdquicicion;
        this.codigo=data.codigo;
        this.descripcion=data.descripcion;
        this.valor=data.valor;
        this.prima=data.prima;
        this.cuota=data.cuota;
        this.plazo=data.plazo;
        this.interes=data.interes;
        this.proveedor=data.proveedor;
        this.direccion=data.direccion;
        this.vidaUtil=data.vidaUtil;
        this.tasa=data.tasaAnual;
        this.valorresidual=data.valorResidual;
        this.observaciones=data.observaciones;
        this.displayDatosEdificios='block';
       });
   
     }
     this.depreciacionService.TarjetaListaTrasacciones(this.parametro).subscribe(data=>{
      this.bienes=data
    });

    //Método para enviar datos al documento excel
    this.depreciacionService.TarjetaExcelTrasacciones(this.parametro).subscribe(data=>{
      this.datosExcel=data
    });

    }
    

    FiltrarArea(sucursal){
      this.depreciacionService.ComboArea(sucursal.value).subscribe(data=>{this.areas=data});
    }

    close() {
      this.display = 'none';
    }

    reporteTarjetaPdf() {
      this.http.get(environment.urlService+"api/Reporte/tarjetaPdf/" + parseInt(this.parametro),{responseType: 'arraybuffer'}).subscribe(pdf=>{
        const blod=new Blob([pdf],{type:"application/pdf"});
        const url= window.URL.createObjectURL(blod);
         window.open(url);
      });
      this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Imprimió un reporte de tarjeta de depreciación de activos.`).subscribe();
    }

      //Método para generar archivo
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.datosExcel,  'Tarjeta de depreciación');
  }

  }