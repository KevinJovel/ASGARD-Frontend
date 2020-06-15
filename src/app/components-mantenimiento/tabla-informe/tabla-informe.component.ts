import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MantenimientoService } from './../../services/mantenimiento.service';

@Component({
  selector: 'app-tabla-informe',
  templateUrl: './tabla-informe.component.html',
  styleUrls: ['./tabla-informe.component.css']
})
export class TablaInformeComponent implements OnInit {
  solicitudes: any;
  bienes: any;
  p: number = 1;
  bien: FormGroup;
  display = 'none';
  titulo: string;
  noSolicitud: string;
  fecha: string;
  jefe: string;
  area:string;

 
  constructor(private mantenimientoService: MantenimientoService) { 

  }

  ngOnInit(): void {
    this.mantenimientoService.getSolicitudMantenimiento().subscribe(data=>{
      this.solicitudes=data;
      
    });
  }

  open(id){

 
  
    this.titulo = "Solicitud de autorizacion de mantenimiento";
    this.display = 'block';
      // this.solicitud.controls["idBien"].setValue("");
      // this.solicitud.controls["codigobien"].setValue("");
      // this.solicitud.controls["descripcionbien"].setValue("");
      // this.solicitud.controls["razonesMantenimiento"].setValue("");
      // this.solicitud.controls["periodoMantenimiento"].setValue("");
  }
  buscar(nombre){}
  
  mostrarbienes(){}
  close() {
    this.display = 'none';
  }
    
}





