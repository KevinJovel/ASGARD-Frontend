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
  informes: any;
  tecnicos:any;
  p: number = 1;
  informe: FormGroup;
  display = 'none';
  titulo: string;
  noSolicitud: string;
  fecha: string;
  jefe: string;
  area:string;

 
  constructor(private mantenimientoService: MantenimientoService) { 
    this.informe=new FormGroup({
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
      this.informes=data;    
    });
this.mantenimientoService.listarTecnicosCombo().subscribe(data=>{
  this.tecnicos=data;    
});
  }
  open(id){

 
  
    this.titulo = "Informe de mantenimiento";
    this.display = 'block';
      this.informe.controls["idBien"].setValue("");
       this.informe.controls["codigobien"].setValue("");
      this.informe.controls["descripcionbien"].setValue("");
       this.informe.controls["razonesMantenimiento"].setValue("");
       this.informe.controls["periodoMantenimiento"].setValue("");
  }
  buscar(nombre){}
  
  mostrarbienes(){}
  close() {
    this.display = 'none';
  }
    
}





