import { Component, OnInit, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import {CargarScriptsService} from './../../services/cargar-scripts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ControlService } from './../../services/control.service';
import Swal from 'sweetalert2';
import { CatalogosService } from './../../services/catalogos.service';//filtro
import {Router} from '@angular/router';
import { State, StateService } from './../../services/state.service';

@Component({
  selector: 'app-tabla-activos',
  templateUrl: './tabla-activos.component.html',
  styleUrls: ['./tabla-activos.component.css']
})
export class TablaActivosComponent implements OnInit {

  dataState:State;//hace referencia a la variable donde estan almacenados los datos
    comboAreaSucur:any;
    //bienes: any;
    id:any;
    tipocombo:string;
    combo: FormGroup;
    p: number = 1;
    display = 'none';
    areas: any;
    sucursal: any;
    nuevobien: FormGroup;
    
    //descripcion: string;
    bienObj: any ={};
    Bien: any ={};//para mandar datos
    disabled: boolean;
    //para ver los datos
    fecha: string; marca: string; area: string; proveedor: string; donante: string; clasificacion: string;
    destino: string; responsable: string; codigo: string; descripcion: string; modelo: string;
    tipoadqui: string; color: string; numserie: string; vidautil: string; estado: string; valor: string;
    plazo: string; prima: string; cuota:string; interes: string; valorresidual: string; foto: string;
    noformu: string ;

  constructor(private router:Router ,private stateService:StateService ,private controlService: ControlService,
    private catalogosServices: CatalogosService) {

    this.combo = new FormGroup({
      'idArea': new FormControl("0"),
      'idSucursal': new FormControl("0"),
      /////////////////////////////////////////////////
      'IdBien': new FormControl("0"),
      'bandera': new FormControl("0"),
      'idEmpleado':new FormControl("0"),
      'tipoadquicicion': new FormControl("0")                                            
  });

 
   }
 

  ngOnInit() {
    
    this.controlService.getBienes().subscribe(res=> { this.comboAreaSucur=res});
   // this.controlService.getBienesAsignados().subscribe(res=> { this.asignados=res});
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursal=data});//filtro
     
  }

  FiltrarArea(){
    var id= this.combo.controls['idSucursal'].value;
    this.controlService.ComboArea(id).subscribe(data=>{this.areas=data});
  }

  Filtrar(){
    var id= this.combo.controls['idArea'].value;
    this.controlService.FiltroTablaActivos(id).subscribe(data=>{this.comboAreaSucur=data});
  }
  
  Reload(){
    this.combo.controls['idSucursal'].setValue(0);
    this.combo.controls['idArea'].setValue(0);
    this.controlService.getBienes().subscribe(res=> { this.comboAreaSucur=res});
  }


close() {
  this.display = 'none';
}


ver(id: any) {
  this.display = 'block';
  this.controlService.DatosVer(id).subscribe((data) => {
   
    this.marca = data.marca;
    this.area = data.area;
    this.responsable = data.responsable;
    this.fecha = data.fecha;
    this.proveedor = data.proveedor;
    this.clasificacion = data.clasificacion;
    this.destino = data.destino;
    this.donante = data.donante;
    this.codigo = data.Codigo;
    this.color = data.Color;
    this.descripcion = data.Desripcion;
    this.estado = data.estadoingreso;
    this.numserie = data.numserie;
    this.plazo = data.plazopago;
    this.tipoadqui = data.tipoadquicicion;
    this.valor = data.valoradquicicion;
    this.valorresidual = data.valorresidual;
    this.vidautil = data.vidautil;
    this.cuota = data.cuotaasignada;
    this.prima = data.prima;
    this.interes = data.intereses;
    this.modelo = data.Modelo;
   // this.tipoadqui = data.tipoadquicicion;
    this.foto =data.foto;
    this.noformu = data.noformulario;
    //console.log(id);
  });
}

MandarDatos(id){
  //console.log(id);
  this.Bien = this.bienObj;
  //creamos un nuevo objeto datas a partir de otro
  this.controlService.RecuperarFormCompleto(id).subscribe((res) => {
    //console.log(res);
    //this.controlService.DatosVer(id).subscribe(res => {this.Bien2 = res});
    let datas = {
      bienObj: res,  //en esto obtengo un solo objeto q es datas   
          // para acceder a los datos unicamente en el otro componente 
           // this.dataState.data.Bien // para poder acceder a los datos de esa variable         
};
this.stateService.changeValue(datas);
this.router.navigate(["./form-nuevoBien"]);
});
   
}

buscar(buscador) {
  this.p = 1;
  this.controlService.buscarActivo(buscador.value).subscribe(res => {this.comboAreaSucur = res});
}

open() {
  //limpia cache
  this.nuevobien.controls["idbien"].setValue("0");
  this.nuevobien.controls["bandera"].setValue("0");
  this.nuevobien.controls["color"].setValue("");
  this.nuevobien.controls["descripcion"].setValue("");
  this.nuevobien.controls["modelo"].setValue("");
  this.nuevobien.controls["tipoadquicicion"].setValue("");
  this.nuevobien.controls["idmarca"].setValue("");
  this.nuevobien.controls["idclasificacion"].setValue("");
  this.nuevobien.controls["idproveedor"].setValue("");
  this.nuevobien.controls["estadoingreso"].setValue("");
  this.nuevobien.controls["plazopago"].setValue("");
  this.nuevobien.controls["prima"].setValue("");
  this.nuevobien.controls["cuotaasignada"].setValue("");
  this.nuevobien.controls["interes"].setValue("");
  this.nuevobien.controls["noformulario"].setValue("");
  this.nuevobien.controls["nofactura"].setValue("");
  this.nuevobien.controls["fechaingreso"].setValue("");
  this.nuevobien.controls["personaentrega"].setValue("");
  this.nuevobien.controls["personarecibe"].setValue("");
  this.nuevobien.controls["observaciones"].setValue("");
  this.nuevobien.controls["cantidad"].setValue("");
  this.nuevobien.controls["foto"].setValue("");
  this.display = 'block';

}




}
