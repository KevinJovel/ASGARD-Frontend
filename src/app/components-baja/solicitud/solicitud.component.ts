import { Component, OnInit } from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  //solicitud2: FormGroup;
  solicitudes2: any;
  //activos: FormGroup;
  activo2: any;
  id:any;
  idsolicitud: any;
  display = 'none';
  titulo: string;
  //parametro: string;
  p: number = 1;

  fecha:string; marca:string; area:string; clasificacion:string; destino:string; responsable:string; 
  codigo:string; descripcion:string; modelo:string; color:string; motivo:string; entidad:string;
  domicilio:string; contacto:string; telefono:string; observaciones:string; ubicacion:string;
  cargo:string; folio:string;
 
  constructor(private router: Router, private activateRoute: ActivatedRoute, private bajaService:BajaService) { }

  ngOnInit() {
    this.bajaService.listarSolicitud().subscribe(res=>{ this.activo2=res });
  }

  guardarDatos(){}

  verSolicitud(id:any) {
    this.display = 'block';
    this.titulo = "Autorización de Solicitud para dar de baja";
    this.bajaService.verSolicitud(id).subscribe((data) => {
   console.log(data);
      this.marca = data.Marca;
      this.area = data.AreaDeNegocio;
      this.responsable = data.responsable;
      this.fecha = data.fechacadena;
      this.clasificacion = data.Clasificacion;
      this.destino = data.destinoinicial;
      this.codigo = data.Codigo;
      this.color = data.Color;
      this.descripcion = data.Desripcion;
      this.modelo = data.Modelo;
      this.motivo = data.motivo;
      this.entidad = data.entidad;
      this.domicilio = data.domicilio;
      this.contacto = data.contacto;
      this.telefono = data.telefono;
      this.cargo = data.cargo;
      this.ubicacion = data.ubicacion;
      this.observaciones = data.observaciones;
      this.folio = data.folio;
    
      //console.log(id);
    });
    this.idsolicitud=id;
  }

  close() {
    this.display = 'none';
  }

  buscar(buscador) {
    this.p = 1;
   }

   aprobarSolicitud() {
    var id=this.idsolicitud;
    Swal.fire({
      title: '¿Estas seguro de aprobar esta solicitud?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, aprobar!'
    }).then((result) => {
      if (result.value) {
    this.bajaService.aceptarSolicitud(id).subscribe(res=>{
         //if(res==1){
          Swal.fire(
            'Solicitud aprobada!',
            'La solictud ha sido aprobada con exito.',
            'success'
          )
          this.display = 'none'; 
          this.bajaService.listarSolicitud().subscribe(res=>{
             this.activo2=res 
            });
         
        //}      
   });
     this.bajaService.cambiarEstadoAceptado(id).subscribe(res=>{
      
     });
   
  }
  })

  }//fin


}
