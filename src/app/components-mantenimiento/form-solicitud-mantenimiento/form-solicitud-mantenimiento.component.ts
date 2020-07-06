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
  bienes: any;
  solicitudes: any;
  empleados: any;
  codigos: any;
  areas: any;
  solicitud: FormGroup;
  datosArray:FormGroup;
  titulo:String;
  display = 'none';
  display2 = 'none';
  p: number = 1;
  matriz:(string | number)[][]=new Array();

  constructor( private mantenimientoService: MantenimientoService) { 
    this.solicitud=new FormGroup({
       'idsolicitud': new FormControl("0"),
       'folio': new FormControl(""),
       'fechasolicitud': new FormControl(""),
       'descripcion': new FormControl("")
      
    }); 
    this.datosArray=new FormGroup({
      'idMantenimiento': new FormControl("0"),
      'idBien': new FormControl("0"),
      'codigobien':new FormControl(""),
      'descripcionbien':new FormControl(""),
      'razonesMantenimiento':new FormControl(""),
      'periodoMantenimiento':new FormControl("")
    });
  }

  ngOnInit(): void {
    this.mantenimientoService.getBienes().subscribe(data=>{
      if(this.matriz.length>0){
      for (let datos of this.matriz) {  
      while (data.idBien!=datos[0]) {
        this.bienes=data;
      }
    }
  }else{
    this.bienes=data;
  }
    });
    this.mantenimientoService.getSolicitudMantenimiento().subscribe(data=>{
      this.solicitudes=data;
    });
  
    this.mantenimientoService.listarCodigoCombo().subscribe(data =>{
      this.codigos =data;
    });
  }

  open2() {
    this.titulo = "Bienes mantenimiento";
    this.display2 = 'block';
  }

  open(id,codigo,descripcion) {
 
    this.titulo = "Datos de mantenimiento";
    this.datosArray.controls["idBien"].setValue(id);
    this.datosArray.controls["codigobien"].setValue(codigo);
    this.datosArray.controls["descripcionbien"].setValue(descripcion);
    this.datosArray.controls["razonesMantenimiento"].setValue("");
    this.datosArray.controls["periodoMantenimiento"].setValue("");
    this.display = 'block';

  }
  close() {
    this.display = 'none';
  }
  close2() {
    this.display2 = 'none';
  }
  arrayMostrar(){
    this.matriz.push([this.datosArray.controls["idBien"].value,this.datosArray.controls["codigobien"].value, 
    this.datosArray.controls["descripcionbien"].value,this.datosArray.controls["razonesMantenimiento"].value,
    this.datosArray.controls["periodoMantenimiento"].value]);
    this.display = 'none';
    this.display2 = 'none';
    this.mantenimientoService.getBienes().subscribe(data=>{
          this.bienes=data;
    });
  }

  guardarDatos() {
  this.mantenimientoService.guardarSolicitud(this.solicitud.value).subscribe(res=>{
  if(res==1){
    for (let datos of this.matriz) {
      this.datosArray.controls["idBien"].setValue(datos[0]);
      this.datosArray.controls["razonesMantenimiento"].setValue(datos[3]);
      this.datosArray.controls["periodoMantenimiento"].setValue(datos[4]);
     this.mantenimientoService.setSolicitud(this.datosArray.value).subscribe(data => {
      this.mantenimientoService.getBienes().subscribe(data=>{
        this.bienes=data;
      });
     });
    }
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Solicitud Guardado con exito',
      showConfirmButton: false,
      timer: 3000
    })
this.matriz=[],[];
}else{
    Swal.fire({
      position: 'center',
      icon: 'warning',
      title: 'Error al guardar',
      showConfirmButton: false,
      timer: 3000
    })
  }
 
}); 
  }
}