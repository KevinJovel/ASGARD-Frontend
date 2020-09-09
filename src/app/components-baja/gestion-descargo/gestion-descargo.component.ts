import { Component, OnInit, ViewChild} from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
//para filtro de areas y sucursales
import { CatalogosService } from './../../services/catalogos.service';

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

  constructor(private bajaService:BajaService,private catalogosServices: CatalogosService) 
  { 
    this.solicitud2 = new FormGroup({
      'idsolicitud': new FormControl("0"),
       //para filtro
       'idArea': new FormControl("0"),
       'idSucursal': new FormControl("0")
    });
  }

  ngOnInit(): void {
    this.bajaService.listarBienes().subscribe(res => { this.activo = res });
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursal=data});//filtro
  }

  close() {
    this.display = 'none';
  }

  buscar(buscador) {
    this.p = 1;
   this.bajaService.buscarBien(buscador.value).subscribe(res => { this.activo = res });
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
    this.bajaService.listarBienes().subscribe(res=> { this.activo=res});
  }
}
