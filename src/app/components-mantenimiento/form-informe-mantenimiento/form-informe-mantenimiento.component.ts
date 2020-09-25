import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MantenimientoService } from './../../services/mantenimiento.service';
//import { format } from 'path';


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
  fecha = Date.now();

 
 
  constructor(private mantenimientoService: MantenimientoService) { 


   //form para la revalorización 
   this.revalorizacion = new FormGroup({
    'idBien': new FormControl(""),
    'valorRevalorizacion': new FormControl("",[Validators.required,Validators.pattern("^[0-9.]+$")]),
    'idinformematenimiento': new FormControl(""),
   // 'valorActual': new FormControl(""),
   // 'valorDepreciacion': new FormControl("0.00"),
    'vidaUtil': new FormControl("",[Validators.pattern("^[0-9]+$")]),
    'fecha': new FormControl("",[Validators.required])
});
  }

  ngOnInit(): void {
    this.mantenimientoService.ListarInformeMantenimiento().subscribe(res=>{
      this.informes=res;  
  
    });
  
  }

          

 
  open(idBien,idinformematenimiento,vidaUtil){
   // alert(id);
    this.titulo = "Revalorización";
    this.revalorizacion.controls["idBien"].setValue(idBien);
    this.revalorizacion.controls["idinformematenimiento"].setValue(idinformematenimiento);
    this.revalorizacion.controls["vidaUtil"].setValue(vidaUtil);
    this.revalorizacion.controls["valorRevalorizacion"].setValue("");
   // this.revalorizacion.controls["fecha"].setValue("");
    
    
 
 
    this.mantenimientoService.ListarInformeMantenimiento().subscribe(res=>{
      this.informes=res;
      this.display = 'block';
    });

       //para recuerar el id 
      // this.mantenimientoService.listarBienesMantenimiento().subscribe(res=>{
       // this.informes=res;
    
     // });
  }


  buscar(buscador) {
    this.p = 1;
    this.mantenimientoService.buscarInformes(buscador.value).subscribe(res => {this.informes = res});
  }

 noRevalorizar(){
  this.mantenimientoService.estadosinrevalorizar(this.revalorizacion.controls["idinformematenimiento"].value).subscribe(rest=>{
    if(rest==1){
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Revalorización no realizada con éxito!',
        showConfirmButton: false,
        timer: 3000
      })
    this.mantenimientoService.ListarInformeMantenimiento().subscribe(data=>{ this.informes=data});
    }
  });
 }
  
  guardarDatos(){

    console.log(this.revalorizacion.value);
   // console.log(this.idmante);
    this.mantenimientoService.insertarRevalorizacion(this.revalorizacion.value).subscribe(res => {
      if(res==1){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Revalorización Guardada con exito!',
          showConfirmButton: false,
          timer: 3000
        })
         this.mantenimientoService.estadoInformeRevalorizado(this.revalorizacion.controls["idinformematenimiento"].value).subscribe(rest=>{
          if(rest==1){
            Swal.fire({
              position: 'center',
              icon: 'success',
              showConfirmButton: false,
              timer: 3000
            })
          this.mantenimientoService.ListarInformeMantenimiento().subscribe(data=>{ this.informes=data});
          
          }
        });
      
      }else{
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '¡Error al guardar!',
          showConfirmButton: false,
          timer: 3000
        })
      }
  
      
    });
    this.revalorizacion.controls["idBien"].setValue("0");
    this.revalorizacion.controls["valorRevalorizacion"].setValue("");
   // this.revalorizacion.controls["fecha"].setValue("");
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

