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
  constructor(private mantenimientoService: MantenimientoService) { 
    this.solicitud=new FormGroup({
      'idsolicitud': new FormControl("0"),
      'folio': new FormControl(""),
      'fechacadena': new FormControl(""),
      'idMantenimiento': new FormControl("0"),
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

  mostrarbienes(){}

  close() {
    this.display = 'none';
  }
}
