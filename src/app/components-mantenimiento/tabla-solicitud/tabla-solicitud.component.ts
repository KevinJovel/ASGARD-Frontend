import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MantenimientoService } from './../../services/mantenimiento.service';

@Component({
  selector: 'app-tabla-solicitud',
  templateUrl: './tabla-solicitud.component.html',
  styleUrls: ['./tabla-solicitud.component.css']
})
export class TablaSolicitudComponent implements OnInit {
  solicitudes: any;
  bienes: any;
  p: number = 1;
  solicitud: FormGroup;
  display = 'none';
  titulo: string;
  noSolicitud: string;
  fecha: string;
  jefe: string;
  area:string;
  constructor(private mantenimientoService: MantenimientoService) { 
    this.solicitud=new FormGroup({
      'idsolicitud': new FormControl("0"),
      'folio': new FormControl(""),
      'fechacadena': new FormControl(""),
      'idtecnico': new FormControl("0"),
      'idBien': new FormControl("0"),
      'codigobien':new FormControl(""),
      'descripcionbien':new FormControl(""),
      'razonesMantenimiento':new FormControl(""),
      'periodoMantenimiento':new FormControl("")
   }); 


  }
  
  ngOnInit(): void {

    this.mantenimientoService.getSolicitudMantenimiento().subscribe(data=>{
      this.solicitudes=data;
      
    });
  }
  crearinforme(){
    
  }
  open(id){
    this.mantenimientoService.listarDatosSolicitud(id).subscribe(data=>{
      this.noSolicitud=data.noSolicitud;
      this.area=data.areanegocio;
      this.jefe=data.jefe;
      this.fecha=data.fechacadena;
  
    });
    this.mantenimientoService.listarBienesSolicitados(id).subscribe(res=>{
      this.bienes=res;
  
    });

    this.titulo = "Solicitud de autorizacion de mantenimiento";
    this.display = 'block';
      // this.solicitud.controls["idBien"].setValue("");
      // this.solicitud.controls["codigobien"].setValue("");
      // this.solicitud.controls["descripcionbien"].setValue("");
      // this.solicitud.controls["razonesMantenimiento"].setValue("");
      // this.solicitud.controls["periodoMantenimiento"].setValue("");
  }
  buscar(nombre){}

  aprobarSolicitud(idsolicitud) {
    Swal.fire({
      title: '¿Estas seguro de aproabr esta solicitud?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aprobar!'
    }).then((result) => {
      if (result.value) {
        this.mantenimientoService.aceptarSolicitud(idsolicitud).subscribe(data => {
          Swal.fire(
            'Solicitud aprobada!',
            'La solicitud ha sido aprobada con éxito con exito.',
            'success'
          )
          this.mantenimientoService.getSolicitudMantenimiento().subscribe(
            data => { this.solicitudes = data }
          );
        });

      }
    })
  }






  mostrarbienes(){}

  close() {
    this.display = 'none';
  }
}
