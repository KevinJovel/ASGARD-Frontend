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
  fecha: string; fecha2: string; marca: string; area: string; proveedor: string; donante: string; clasificacion: string;
 responsable: string; codigo: string; descripcion: string;  folio: string; entidad: string;
  tipoadqui: string; color: string;  estado: string; valor: string; acuerdo: string; motivo: string;

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
    this.bajaService.verDescargos(id).subscribe((data) => {
        
      this.codigo = data.codigo;
      this.folio = data.folio;
      this.fecha = data.fechacadena;
      this.fecha2 = data.fechacadena2;
      this.entidad = data.entidadbeneficiaria;
      this.proveedor = data.proveedor;
      this.clasificacion = data.clasificacion;
      this.acuerdo = data.acuerdo;
      this.donante = data.donante;
      this.color = data.color;
      this.marca = data.marca;
      this.descripcion = data.descripcion;
      this.estado = data.estadoingreso;
      this.tipoadqui = data.tipoadquicicion;
      this.valor = data.valor;
      this.motivo = data.nombredescargo;
      this.responsable = data.responsable;
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
