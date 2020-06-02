import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from './../../services/mantenimiento.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-solicitud-mantenimiento',
  templateUrl: './form-solicitud-mantenimiento.component.html',
  styleUrls: ['./form-solicitud-mantenimiento.component.css']
})
export class FormSolicitudMantenimientoComponent implements OnInit {
  display = 'none';
  solicitudes: any;
  empleados: any;
  areas: any;
  solicitud: FormGroup;
  titulo: string;
  p: number = 1; 
  constructor( private mantenimientoServices:MantenimientoService) {
    this.solicitud= new FormGroup({
      'idsolicitud': new FormControl("0"),
      'personasolicitante': new FormControl("")


    });

   }

  ngOnInit(): void {
    this.mantenimientoServices.listarEmpleadosCombo().subscribe(data =>{
      this.empleados= data;
    });
    this.mantenimientoServices.listarAreaCombo().subscribe(data=>{
      this.areas= data;
    })
  }
  guardarDatos(){
    
  }

  open() {
    this.titulo = "Formulario ingreso de bienes a mantenimiento";
    this.solicitud.controls["idsolicitud"].setValue("0");
    this.solicitud.controls["personasolicitante"].setValue("");
    


  }
  close() {
    this.display = 'none';
  }
}
