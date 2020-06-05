import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from './../../services/mantenimiento.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HashLocationStrategy } from '@angular/common';



@Component({
  selector: 'app-form-solicitud-mantenimiento',
  templateUrl: './form-solicitud-mantenimiento.component.html',
  styleUrls: ['./form-solicitud-mantenimiento.component.css']
})
export class FormSolicitudMantenimientoComponent implements OnInit {

  solicitudes: any;
  empleados: any;
  areas: any;
  solicitud: FormGroup;
  titulo:String;
  display = 'none';
  p: number = 1;

  constructor( private mantenimientoService: MantenimientoService) { 
    this.solicitud=new FormGroup({
       'idsolicitud': new FormControl("0"),
       'bandera': new FormControl("0"),
       'folio': new FormControl(""),
       'fechacadena': new FormControl(""),
       'fechasolicitud': new FormControl(""),
       'personasolicitante':new FormControl(""),
       'codigobien':new FormControl(""),
       'descripcionbien':new FormControl(""),
       'razonesmantenimiento':new FormControl(""),
       'periodomantenimiento':new FormControl(""),
       'nombrecompleto':new FormControl(""),
       'idareadenegocio':new FormControl("0"),
       'idresponsable': new FormControl("0"),
       'idsucursal':new FormControl("0")
      
    }); 
  }

  ngOnInit(): void {
    this.mantenimientoService.getSolicitudMantenimiento().subscribe(data=>{
      this.solicitudes=data;
    });
    this.mantenimientoService.listarAreaCombo().subscribe(data =>{
      this.areas =data;
    });
    this.mantenimientoService.listarEmpleadosCombo().subscribe(data =>{
      this.empleados =data;
    });
  }
// No tenías estos métodos para abrir y cerrar el modal
  open() {
    this.titulo = "Formulario bienes mantenimiento";
    this.solicitud.controls["idsolicitud"].setValue("0");
    //this.solicitud.controls["bandera"].setValue("0");
  //  this.solicitud.controls["folio"].setValue("");
    //this.solicitud.controls["fechasolicitud"].setValue("");
    this.solicitud.controls["personasolicitante"].setValue("");
    this.solicitud.controls["codigobien"].setValue("");
    this.solicitud.controls["descripcionbien"].setValue("");
    this.solicitud.controls["razonesmantenimiento"].setValue("");
    this.solicitud.controls["periodomantenimiento"].setValue("");
     
    this.display = 'block';
  }
  close() {
    this.display = 'none';
  }

  guardarDatos() {
    if ((this.solicitud.controls["bandera"].value) == "0") {
      if (this.solicitud.valid == true) {
        this.mantenimientoService.guardarSolicitud(this.solicitud.value).subscribe(data => {
          this.mantenimientoService.getSolicitudMantenimiento().subscribe(res => {this.solicitudes = res});
         });
       
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Guardado con exito',
          showConfirmButton: false,
          timer: 3000
        })
      }
    } else {
      //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar
      this.solicitud.controls["bandera"].setValue("0");
      if (this.solicitud.valid == true) {
        this.mantenimientoService.getSolicitudMantenimiento().subscribe(data=>{
          this.solicitudes=data;
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro modificado con exito',
          showConfirmButton: false,
          timer: 3000
        })
      }
    }
    
    this.solicitud.controls["idsolicitud"].setValue("0");
    this.solicitud.controls["bandera"].setValue("0");
      this.solicitud.controls["folio"].setValue("");
      this.solicitud.controls["fechasolicitud"].setValue("");
      this.solicitud.controls["idareadenegocio"].setValue("");
      this.solicitud.controls["idsucursal"].setValue("");
      this.solicitud.controls["idresponsable"].setValue("");
      this.solicitud.controls["codigobien"].setValue("");
      this.solicitud.controls["descripcionbien"].setValue("");
      this.solicitud.controls["razonesmantenimiento"].setValue("");
      this.solicitud.controls["periodomantenimiento"].setValue("");
      
  
      this.display = 'none';
      this.mantenimientoService.getSolicitudMantenimiento().subscribe(res => {this.solicitudes = res});
  
  }

  /*guardarDatos() {
   // if ((this.solicitud.controls["bandera"].value) == "0") {
      if (this.solicitud.valid == true) {
        this.mantenimientoService.guardarSolicitud(this.solicitud.value).subscribe(data => {
          this.mantenimientoService.getSolicitudMantenimiento().subscribe(res => {this.solicitudes = res});
         });
       
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Guardado con exito',
          showConfirmButton: false,
          timer: 3000
        })
      }
   // } 
    this.solicitud.controls["idsolicitud"].setValue("0");
  //  this.solicitud.controls["bandera"].setValue("0");
    this.solicitud.controls["folio"].setValue("");
    this.solicitud.controls["fechasolicitud"].setValue("");
    this.solicitud.controls["idareadenegocio"].setValue("");
    this.solicitud.controls["idsucursal"].setValue("");
    this.solicitud.controls["idresponsable"].setValue("");
    this.solicitud.controls["codigobien"].setValue("");
    this.solicitud.controls["descripcionbien"].setValue("");
    this.solicitud.controls["razonesmantenimiento"].setValue("");
    this.solicitud.controls["periodomantenimiento"].setValue("");
    

    this.display = 'none';
    this.mantenimientoService.getSolicitudMantenimiento().subscribe(res => {this.solicitudes = res});

  }*/
}