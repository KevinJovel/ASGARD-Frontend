import { Component, OnInit, ViewChild} from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//para filtro de areas y sucursales
import { CatalogosService } from './../../services/catalogos.service';
import { ControlService } from './../../services/control.service';

@Component({
  selector: 'app-gestion-descargo',
  templateUrl: './gestion-descargo.component.html',
  styleUrls: ['./gestion-descargo.component.css']
})
export class GestionDescargoComponent implements OnInit {

  datosbien:FormGroup;
  activo: any;
  display = 'none';
  p: number = 1;
  //para filtro
  areas: any;
  sucursal: any;
  solicitud2: FormGroup;

  //para ver los datos
  fecha: string; marca: string; area: string; proveedor: string; donante: string; clasificacion: string;
  destino: string; responsable: string; codigo: string; descripcion: string; modelo: string;
  tipoadqui: string; color: string; numserie: string; vidautil: string; estado: string; valor: string;
  plazo: string; prima: string; cuota:string; interes: string; valorresidual: string; foto: string;
  noformu: string ;

  constructor(private bajaService:BajaService,private catalogosServices: CatalogosService,private controlService: ControlService) 
  { 
    this.solicitud2 = new FormGroup({
      'idsolicitud': new FormControl("0"),
       //para filtro
       'idArea': new FormControl("0"),
       'idSucursal': new FormControl("0"),
      /////////////////////////////////////////////////
      'IdBien': new FormControl("0"),
      'tipoadquicicion': new FormControl("0") 
    });
  }

  ngOnInit(): void {
    this.bajaService.listarBajas().subscribe(res => { this.activo = res });
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursal=data});//filtro
  }

  close() {
    this.display = 'none';
  }

  buscar(buscador) {
    this.p = 1;
   this.bajaService.buscarDescargos(buscador.value).subscribe(res => { this.activo = res });
   }
  
  ver(id: any) {
    this.display = 'block';
    this.controlService.VerDatosActivosNoAsig(id).subscribe((data) => {
     
      this.marca = data.marca;
      this.fecha = data.fecha;
      this.proveedor = data.proveedor;
      this.clasificacion = data.clasificacion;
      this.destino = data.destino;
      this.donante = data.donante;
      this.color = data.Color;
      this.descripcion = data.Desripcion;
      this.estado = data.estadoingreso;
      this.plazo = data.plazopago;
      this.tipoadqui = data.tipoadquicicion;
      this.valor = data.valoradquicicion;
      this.valorresidual = data.valorresidual;
      this.cuota = data.cuotaasignada;
      this.prima = data.prima;
      this.interes = data.intereses;
      this.modelo = data.Modelo;
      this.foto =data.foto;
      this.noformu = data.noformulario;
      //console.log(id);
    });
  }

  
    FiltrarArea(){
    var id= this.solicitud2.controls['idSucursal'].value;
    this.bajaService.ComboArea(id).subscribe(data=>{this.areas=data});
  }

  Filtrar(){
    var id= this.solicitud2.controls['idArea'].value;
    this.bajaService.FiltroTablaActivos(id).subscribe(data=>{this.activo=data});
  }
  
  Reload(){
    this.solicitud2.controls['idSucursal'].setValue(0);
    this.solicitud2.controls['idArea'].setValue(0);
    this.bajaService.listarBajas().subscribe(res=> { this.activo=res});
  }
  
}
