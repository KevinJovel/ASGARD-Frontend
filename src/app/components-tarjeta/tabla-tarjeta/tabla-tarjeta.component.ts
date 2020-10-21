import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepreciacionService } from './../../services/depreciacion.service';
import { ControlService } from './../../services/control.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-tabla-tarjeta',
  templateUrl: './tabla-tarjeta.component.html',
  styleUrls: ['./tabla-tarjeta.component.css']
})
export class TablaTarjetaComponent implements OnInit {

  bienes: any;
  sucursales: any;
  areas:any;
  combos: FormGroup;
  p: number=1;
  display2 = 'none';
  foto: any;
  // Variables para tipos de activos
  tablaEdificios='none';
  tablaMuebles='none';
  tablaIntengibles='none';
  disabledFiltroBotonAsignacion:boolean;
  banderaBuscador:any=1;//bandera para cambiar el buscador
  disabledFiltro: boolean;//Esta bandera sirve para inhabilitar los filtros en edificios e intangibles

  constructor(private catalogosServices: CatalogosService,private depreciacionService:DepreciacionService, private controlService: ControlService) { 
    this.combos=new FormGroup({
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0"),
      'idTipo': new FormControl("0")
     });
  }

  ngOnInit(): void {
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursales=data});
    this.depreciacionService.TablaTarjeta().subscribe(data=>{this.bienes=data
      this.tablaMuebles='block';
    });
  }

  CambiarTipo(){
    switch(this.combos.controls["idTipo"].value){
      case '1':
        this.tablaEdificios='none'
        this.tablaIntengibles='none'
        this.depreciacionService.TablaDepreciacion().subscribe(data=>{this.bienes=data
          this.tablaMuebles='block'; 
        });
        this.disabledFiltro=false;
        this.banderaBuscador=1;
      break;
      case '2':
        this.tablaMuebles='none'
        this.tablaIntengibles='none'
        this.controlService.getBienesAsignadosEdificios().subscribe(res=> { this.bienes=res
          this.tablaEdificios='block'});
        this.disabledFiltro=true;
        this.banderaBuscador=2;
      break;
      case '3':
        this.tablaEdificios='none'
        this.tablaMuebles='none'
        this.controlService.getBienesAsignadosIntengibles().subscribe(res=> { this.bienes=res
          this.tablaIntengibles='block'
        });
       
        this.disabledFiltro=true;
        this.banderaBuscador=3;
      break;
      default:
        console.log("ocurrio un error en la consulta de datos");
    }
  }

  FiltrarArea(){
    var id= this.combos.controls['idSucursal'].value;
    this.depreciacionService.ComboArea(id).subscribe(data=>{this.areas=data});
  }
  Filtrar(){
    var id= this.combos.controls['idArea'].value;
    this.depreciacionService.FiltroTablaTarjeta(id).subscribe(data=>{this.bienes=data});
  }
   Reload(){
    this.combos.controls['idSucursal'].setValue(0);
    this.combos.controls['idArea'].setValue(0);
    this.combos.controls['idTipo'].setValue(0);
    this.tablaEdificios='none';
    this.tablaIntengibles='none';
    this.depreciacionService.TablaDepreciacion().subscribe(data=>{
      this.bienes=data
      this.tablaMuebles='block';
      this.banderaBuscador=1;
    });
    this.disabledFiltroBotonAsignacion=false;
    this.disabledFiltro=false;
  }
  buscar(buscador){
    this.p = 1;
    if(this.banderaBuscador==1){
    this.depreciacionService.BuscarTablaDepreciacion(buscador.value).subscribe(res => {this.bienes = res});
  }else if(this.banderaBuscador==2){
      this.controlService.buscarActivoEdificioAsig(buscador.value).subscribe(res => {this.bienes = res});
    }else if(this.banderaBuscador==3){
      this.controlService.buscarActivoIntengibleAsig(buscador.value).subscribe(res => {this.bienes = res});
    }
  }
  mostrarFoto(id){

    this.depreciacionService.recuperarFoto(id).subscribe(data => {
       
        if(data.foto==null) {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'No existe una foto registrada de este activo.',
            showConfirmButton: false,
            timer: 3000
        })
        } else {
          this.display2 = 'block';
          this.foto=data.foto;
        }
        
  
    });
  }
  close2() {
    this.display2 = 'none';
  }

}
 

  


