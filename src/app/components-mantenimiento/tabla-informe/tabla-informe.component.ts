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
      'idinformematenimiento': new FormControl("0"),
      'idmantenimiento': new FormControl(""),
      'fechacadena': new FormControl(""),
      'idtecnico': new FormControl(""),
      //'idBien': new FormControl("0"),
      'descripcion':new FormControl(""),
      'costomateriales':new FormControl(""),
      'costomo':new FormControl(""),
      'costototal':new FormControl("")
   }); 
  }

  ngOnInit(): void {
    this.mantenimientoService.listarBienesMantenimiento().subscribe(res=>{
      this.bienes=res;
  
    });
    this.mantenimientoService.listarTecnicoCombo().subscribe(data=>{
      this.tecnicos=data;    
      });
  }
  open(id){

 
  
    this.titulo = "Informe de mantenimiento";
    this.display = 'block';
      this.informe.controls["idinformematenimiento"].setValue("0");
       this.informe.controls["idmantenimiento"].setValue("");
      this.informe.controls["fechacadena"].setValue("");
       this.informe.controls["idtecnico"].setValue("");
       this.informe.controls["descripcion"].setValue("");
       this.informe.controls["costomateriales"].setValue("");
       this.informe.controls["costomo"].setValue("");
       this.informe.controls["costototal"].setValue("");


  }
  buscar(nombre){}
  
  mostrarbienes(){}
  close() {
    this.display = 'none';
  }
    
}





