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
  combo: FormGroup;
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

    this.combo = new FormGroup({
        'idTipo': new FormControl("0"),
        'idCombo': new FormControl("0"),
        'fech': new FormControl(""),
        'plazo': new FormControl(""),
        'cuota': new FormControl(""),
        'interes': new FormControl(""),
        'prima': new FormControl("")
        
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
    
    var idempleado=this.combo.controls["idTipo"].value;
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

guardarDatos() {
    //Si la vandera es cero que es el que trae por defecto en el metodo open() entra en la primera a insertar
       
        if (this.sucursal.valid == true) {
            this.catalogoService.setSucursal(this.sucursal.value).subscribe(data => {
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Dato Guardado con exito',
                showConfirmButton: false,
                timer: 3000
            })
        }
    
}

}
