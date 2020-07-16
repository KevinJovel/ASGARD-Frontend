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
  idmante: any;

 
  constructor(private mantenimientoService: MantenimientoService) { 
    this.informe=new FormGroup({
      'idinformematenimiento': new FormControl("0"),
      'idmantenimiento': new FormControl("0"),
      'idBien': new FormControl("0"),
      'fechainforme': new FormControl(""),
      'idtecnico': new FormControl("0"),
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
  open(id,idbien){
    alert(id);
 
  
    this.titulo = "Informe de mantenimiento";
    this.display = 'block';
      this.informe.controls["idinformematenimiento"].setValue("0");
      this.informe.controls["idmantenimiento"].setValue(id);
      this.informe.controls["idBien"].setValue(idbien);
      this.informe.controls["fechainforme"].setValue("");
       this.informe.controls["idtecnico"].setValue("");
       this.informe.controls["descripcion"].setValue("");
       this.informe.controls["costomateriales"].setValue("");
       this.informe.controls["costomo"].setValue("");
       this.informe.controls["costototal"].setValue("");
       
       //para recuerar el id 
       this.mantenimientoService.listarBienesMantenimiento().subscribe(res=>{
        this.bienes=res;
    
      });
       

  }
  buscar(nombre){}
  
  guardarDatos(){
    console.log(this.informe.value);
    console.log(this.idmante);
    this.mantenimientoService.guardarInformeMantenimiento(this.informe.value).subscribe(res => {
      if(res==1){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Guardado con exito',
          showConfirmButton: false,
          timer: 3000
        })
         this.mantenimientoService.cambiarEstadoDenegado(this.informe.controls["idBien"].value).subscribe(rest=>{
          if(rest==1){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'cambio',
              showConfirmButton: false,
              timer: 3000
            })
          this.mantenimientoService.listarBienesMantenimiento().subscribe(data=>{ this.bienes=data});
          }
        });
      
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
      this.informe.controls["idinformematenimiento"].setValue("0");
      this.idmante= this.informe.controls["idmantenimiento"].setValue("");
      this.informe.controls["fechainforme"].setValue("");
      this.informe.controls["idtecnico"].setValue("");
      this.informe.controls["descripcion"].setValue("");
      this.informe.controls["costomateriales"].setValue("");
      this.informe.controls["costomo"].setValue("");
      this.informe.controls["costototal"].setValue("");
   

this.display = 'none';
this.mantenimientoService.listarBienesMantenimiento().subscribe(res=>{
  this.bienes=res;

});

  }

  guardarDatos1() {
    var id=this.idmante;
      if (this.informe.valid == true) {
        this.mantenimientoService.guardarInformeMantenimiento(this.informe.value).subscribe(data => {
          this.mantenimientoService.listarBienesMantenimiento().subscribe(res => {this.bienes = res});
         });
        
       
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Guardado con exito',
          showConfirmButton: false,
          timer: 3000
        })
      }
     else {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Error al guardar',
        showConfirmButton: false,
        timer: 3000
      })
    }
    
    /*this.informe.controls["idinformematenimiento"].setValue("0");
    this.informe.controls["idmantenimiento"].setValue("");
    this.informe.controls["fechainforme"].setValue("");
    this.informe.controls["idtecnico"].setValue("");
    this.informe.controls["descripcion"].setValue("");
    this.informe.controls["costomateriales"].setValue("");
    this.informe.controls["costomo"].setValue("");
    this.informe.controls["costototal"].setValue("");*/

    this.display = 'none';
   // this.mantenimientoService.listarBienesMantenimiento().subscribe(res => {this.bienes = res});

  }

 /* guardar() {
   // var id=this.idSoli;
   // alert(id);

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
    this.mantenimientoService.guardarInformeMantenimiento(this.informe.value).subscribe(res=>{
         if(res==1){
          Swal.fire(
            'Solicitud aprobada!',
            'La solictud ha sido aprobada con exito.',
            'success'
          )
          this.display = 'none'; 
          this.mantenimientoService.getSolicitudMantenimiento().subscribe(data=>{
            this.solicitudes=data;
            
          });
         }
        
   });

  }// del result
  })//de la alerta

  

  }*/




  close() {
    this.display = 'none';
  }
    
}





