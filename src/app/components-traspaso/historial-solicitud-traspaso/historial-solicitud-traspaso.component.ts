import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepreciacionService } from './../../services/depreciacion.service';
import { MantenimientoService } from './../../services/mantenimiento.service';
import { TraspasoService } from 'src/app/services/traspaso.service';

import Swal from 'sweetalert2';

//import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import { State, StateService } from './../../services/state.service';

@Component({
  selector: 'app-historial-solicitud-traspaso',
  templateUrl: './historial-solicitud-traspaso.component.html',
  styleUrls: ['./historial-solicitud-traspaso.component.css']
})
export class HistorialSolicitudTraspasoComponent implements OnInit {
  bienes: any;
  sucursales: any;
  areas:any;
  combos: FormGroup;
  p: number=1;
  titulo:string;
  datos:FormGroup;
  display = 'none';
  display2 = 'none';
  //Datos del modal
  coopertativa:string;
  anio:string;
  //para mostrar datos de historial
  idbien: any;
  descripcion: string;
  codigo: string;
  encargado:string;
  areadenegocio: any;

  // para listar el historial
  solicitudes: any;
   tecnicos:any;
   solicitud: FormGroup;
   revalorizacion: FormGroup;
   display3 = 'none';
   titulo3: string;

   bienid: any;
  
   idmante: any;
 
  constructor(private catalogosServices: CatalogosService,private depreciacionService:DepreciacionService,
    private mantenimientoService: MantenimientoService,  private TraspasoService: TraspasoService) { 
    this.combos=new FormGroup({
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0")
     });
     this.datos = new FormGroup({
      'idBien': new FormControl("0"),
      // 'bandera': new FormControl("0"),
      'codigo': new FormControl(""),
      'descripcion': new FormControl(""),
      'valorAdquicicion': new FormControl(""),
      'valorActual': new FormControl(""),
      'valorDepreciacion': new FormControl("")
  });
// para historial
  
  }

  ngOnInit(): void {
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursales=data});
    this.mantenimientoService.listarActivosHistorial().subscribe(data=>{this.bienes=data});


    

//para historial
/*this.mantenimientoService.historialInformes().subscribe(res=>{
      this.informes=res;  
    });*/
  }
  FiltrarArea(){
    var id= this.combos.controls['idSucursal'].value;
    this.depreciacionService.ComboArea(id).subscribe(data=>{this.areas=data});
  }
  Filtrar(){
    var id= this.combos.controls['idArea'].value;
    this.depreciacionService.FiltroTablaDepreciacion(id).subscribe(data=>{this.bienes=data});
  }
  Reload(){
    this.combos.controls['idSucursal'].setValue(0);
    this.combos.controls['idArea'].setValue(0);
    this.depreciacionService.TablaDepreciacion().subscribe(data=>{this.bienes=data});
  }
  AplicarDepreciacion(){


  }

  open(id) {
    //this.TraspasoService.historialSolicitudesTraspasos(id).subscribe(data=>{this.sucursales=data});
     this.TraspasoService.historialSolicitudesTraspasos(id).subscribe(res => {
    if(res == 0){
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: '¡El activo seleccionado no tiene ningún traspaso realizado!',
        showConfirmButton: false,
        timer: 3000
      })
  }else{
    this.titulo = "Historial de traspasos";
    this.display = 'block';
    this.mantenimientoService.listardatosHistorial(id).subscribe(data=>{
      this.codigo=data.codigo;
      this.descripcion=data.descripcion;
      this.encargado=data.encargado;
      this.areadenegocio=data.areadenegocio;
     
    });
    //para recuperar el id del bien 
    this.TraspasoService.historialSolicitudesTraspasos(id).subscribe(res=>{
      this.solicitudes=res;  
    });
  }
    })//cierre de no ay historial
    //this.idbien=id;

  }

  close(){
    this.display='none';
  }

  buscar(buscador){
    this.p = 1;
    this.mantenimientoService.buscarActivoHistorial(buscador.value).subscribe(data => {this.bienes = data});
  }

 
}
