import { Component, OnInit, Input } from '@angular/core';
import {FormGroup, Validators, FormControl} from '@angular/forms';
import { CatalogosService } from './../../services/catalogos.service';
import { ControlService } from './../../services/control.service';
import { Router, ActivatedRoute } from '@angular/router'
import { CargarScriptsService} from './../../services/cargar-scripts.service';
import { style } from '@angular/animations'
import Swal from 'sweetalert2';
declare var jQuery:any;
declare var $;

@Component({
  selector: 'app-form-nuevo-bien',
  templateUrl: './form-nuevo-bien.component.html',
  styleUrls: ['./form-nuevo-bien.component.css']
})
export class FormNuevoBienComponent implements OnInit {
  //Variables para combos
  comboProvDon:any;
  clasificaciones: any;
  tipocombo:string;
  marcas: any;

  //Variables
  id:any;
  nuevobien: FormGroup;
  marca: FormGroup;
  sucursal: FormGroup;
  p: number = 1;
  display = 'none';
  disabled: boolean;
  

  //Variables de etiqueta
  disabledPrima:string;
  disabledPlazo:string;
  disabledCuota:string;
  disabledInteres:string;

  constructor(private catalogoService: CatalogosService, private _cargarScript:CargarScriptsService, private controlService: ControlService) {
    this._cargarScript.cargar(["/jquery.stepy","/sortingTable"]);

    this.nuevobien = new FormGroup({
      'idbien': new FormControl("0"),
      'color': new FormControl(""),
      'descripcion': new FormControl(""),
      'modelo': new FormControl(""),
      'tipoadquicicion': new FormControl("0"),
       'idmarca': new FormControl("0"),
       'idclasificacion': new FormControl("0"),
        'idproveedor': new FormControl(""),
         'estadoingreso': new FormControl("0"),
         'valoradquicicion': new FormControl(""),
         'plazopago': new FormControl(""),
         'prima': new FormControl(""),
         'cuotaasignada': new FormControl(""),
         'interes': new FormControl(""),
        'noformulario': new FormControl("0"),
        'nofactura': new FormControl(""),
        'fechaingreso': new FormControl(""),
        'personaentrega': new FormControl(""),
        'personarecibe': new FormControl(""),
        'observaciones': new FormControl(""),
        'cantidad': new FormControl("")
      
        
        
    });
   }

  ngOnInit() {
    this.tipocombo="Proveedor o Donante:";
    this.disabledPrima="Ingrese prima"
    this.disabledPlazo="Ingrese plazo"
    this.disabledCuota="Ingrese cuota"
    this.disabledInteres="Ingrese interes"

    this.controlService.listarComboClasificacion().subscribe(data=>{
      this.clasificaciones=data;
    });

    this.controlService.listarComboMarca().subscribe(data=>{
      this.marcas=data;
    });
  }
  //Método para cargar combo
  ProveedorDonante(){
    
    var idempleado=this.nuevobien.controls["tipoadquicicion"].value;
    if(idempleado==1||idempleado==2){

      
      this.tipocombo="Proveedor:";
      this.disabledPrima="Inhabilitado";
      this.disabledPlazo="Inhabilitado";
      this.disabledCuota="Inhabilitado";
      this.disabledInteres="Inhabilitado";
      if(idempleado==1){
        this.disabled=true;
      }else{
        this.disabled=false;
        this.disabledPrima="Ingrese prima"
        this.disabledPlazo="Ingrese plazo"
        this.disabledCuota="Ingrese cuota"
        this.disabledInteres="Ingrese interes"
      }
      this.controlService.listarComboProveedor().subscribe(res=> {this.comboProvDon=res});
    }else{
      this.disabled=true;
      this.tipocombo="Donante:";
    
      this.controlService.listarComboDonante().subscribe(res=> {this.comboProvDon=res});
    }
   
}

guardarDatoss() {
    if (this.nuevobien.valid == true) {
      this.controlService.agregarFormIngreso(this.nuevobien.value).subscribe(data => {
        if(data==1){
          this.controlService.agregarBien(this.nuevobien.value).subscribe(res => {
            if(res==1){
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Registro Guardado con éxito',
                showConfirmButton: false,
                timer: 3000
              })
            }else{
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'No guardó',
                showConfirmButton: false,
                timer: 3000
              })
            }
              
            }); 

        }
    
       });
      
     
    }
  //  else {
  //   //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar
  //   this.nuevobien.controls["bandera"].setValue("0");
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Registro no guardado',
  //       showConfirmButton: false,
  //       timer: 3000
  //     })
  //   }
  
  

}
}
