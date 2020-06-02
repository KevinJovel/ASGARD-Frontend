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

  //Variables 
  //Con estas variables tenes el FormGroup donde agregas los campos para el formulario, el display es para el modal
  solicitudes: FormGroup;
  titulo:String;
  display = 'none';

  constructor() { 
    this.solicitudes=new FormGroup({
      'nombre': new FormControl(""),
      'telefono': new FormControl(""),
      'direccion': new FormControl("")

    }); 
  }

  ngOnInit(): void {
  }
// No tenías estos métodos para abrir y cerrar el modal
  open() {
    this.solicitudes.controls["nombre"].setValue("0");
    this.solicitudes.controls["telefono"].setValue("0");
    this.solicitudes.controls["direccion"].setValue(""); 
    this.display = 'block';
  }
  close() {
    this.display = 'none';
  }

  guardarDatos(){
    
  }
}