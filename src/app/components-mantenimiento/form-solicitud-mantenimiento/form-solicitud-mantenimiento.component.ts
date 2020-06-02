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
       'folio': new FormControl("0"),
       'fechacadena': new FormControl(""),
       'personasolicitante':new FormControl(""),
       'codigobien':new FormControl(""),
       'descripcionbien':new FormControl(""),
       'razonesmantenimiento':new FormControl(""),
       'periodomantenimiento':new FormControl(""),
       'nombrecompleto':new FormControl(""),
       'idareadenegocio':new FormControl(""),
       'idresponsable': new FormControl(""),
       'idsucursal':new FormControl("")
      
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
    this.solicitud.controls["folio"].setValue("");
    this.solicitud.controls["fechacadena"].setValue("");
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

  guardarDatos(){
    
  }
}