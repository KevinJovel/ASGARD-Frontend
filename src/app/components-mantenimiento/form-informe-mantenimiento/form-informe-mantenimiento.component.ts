import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MantenimientoService } from './../../services/mantenimiento.service';


@Component({
  selector: 'app-form-informe-mantenimiento',
  templateUrl: './form-informe-mantenimiento.component.html',
  styleUrls: ['./form-informe-mantenimiento.component.css']
})
export class FormInformeMantenimientoComponent implements OnInit {


  informes: any;
 // bienes: any;
  tecnicos:any;
  p: number = 1;
  informe: FormGroup;
  revalorizacion: FormGroup;
  display = 'none';
  titulo: string;
 
  idmante: any;

 
 
  constructor(private mantenimientoService: MantenimientoService) { 


   //form para la revalorización 
   this.revalorizacion = new FormGroup({
  //  'idBien': new FormControl("0"),
    'valorRevalorizacion': new FormControl(""),
   // 'valorActual': new FormControl(""),
   // 'valorDepreciacion': new FormControl("0.00"),
   // 'vidaUtil': new FormControl(""),
    'fecha': new FormControl("")
});
  }

  ngOnInit(): void {
    this.mantenimientoService.ListarInformeMantenimiento().subscribe(res=>{
      this.informes=res;
  
    });
  }
  open(){
   // alert(id);
    this.titulo = "Revalorización";
   // this.revalorizacion.controls["idBien"].setValue("0");
    this.revalorizacion.controls["valorRevalorizacion"].setValue("");
    this.revalorizacion.controls["fecha"].setValue("");
  //  this.revalorizacion.controls["vidaUtil"].setValue("");
    this.display = 'block';
    //para cargar el valor de vida util:
    //this.empleado.controls["idempleado"].setValue(data.idempleado); 


       //para recuerar el id 
      // this.mantenimientoService.listarBienesMantenimiento().subscribe(res=>{
       // this.informes=res;
    
     // });
  }

 
  buscar(buscador) {
    this.p = 1;
    this.mantenimientoService.buscarInformes(buscador.value).subscribe(res => {this.informes = res});
  }


  
  guardarDatos(){

    console.log(this.revalorizacion.value);
   // console.log(this.idmante);
    this.mantenimientoService.insertarRevalorizacion(this.revalorizacion.value).subscribe(res => {
      if(res==1){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Revalorización Guardada con exito',
          showConfirmButton: false,
          timer: 3000
        })
        /* this.mantenimientoService.cambiarEstadoDenegado(this.informe.controls["idBien"].value).subscribe(rest=>{
          if(rest==1){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'cambio',
              showConfirmButton: false,
              timer: 3000
            })
          this.mantenimientoService.listarBienesMantenimiento().subscribe(data=>{ this.informes=data});
          }
        });*/
      
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
    this.revalorizacion.controls["idBien"].setValue("0");
    this.revalorizacion.controls["valorRevalorizacion"].setValue("");
    this.revalorizacion.controls["fecha"].setValue("");
    this.revalorizacion.controls["vidaUtil"].setValue("");

       

      //this.costototal= this.costomateriales.s + this.cotomo;
   

this.display = 'none';
this.mantenimientoService.ListarInformeMantenimiento().subscribe(res=>{
  this.informes=res;

});

  }

  close() {
    this.display = 'none';
  }
    
}

