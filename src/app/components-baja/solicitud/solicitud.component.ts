import { Component, OnInit, ViewChild} from '@angular/core';
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
 // id:any;
  idsolicitud: any;
  display = 'none';
  titulo: string;
  //parametro: string;
  p: number = 1;
  solicitudes: FormGroup;

  fecha:string; marca:string; area:string;  responsable:string; 
  codigo:string; descripcion:string;  motivo:string; entidad:string; observaciones:string; ubicacion:string;
  cargo:string; folio:string; solicitud: string; acuerdo: string;
 
  constructor(private router: Router, private activateRoute: ActivatedRoute, private bajaService:BajaService) 
  { 
    this.solicitudes = new FormGroup({
      'idsolicitud': new FormControl("0"),
       'acuerdo': new FormControl("",[Validators.required,Validators.maxLength(30)],this.noRepetirAcuerdo.bind(this)),
      
    });
  }

  ngOnInit() {
    this.bajaService.listarSolicitud().subscribe(res=>{ this.activo2=res });
  }

  guardarDatos(){

  }


  verSolicitud(id) {
    this.display = 'block';
    this.titulo = "Autorización de Solicitud para dar de baja";
    this.solicitudes.controls["acuerdo"].setValue("");//limpia cache
    this.bajaService.verSolicitud(id).subscribe((data) => {
   console.log(data);
      
      //this.area = data.AreaDeNegocio;
     // this.responsable = data.responsable;
      this.fecha = data.fechacadena;
      this.codigo = data.codigo;
      this.descripcion = data.descripcion;
      this.motivo = data.motivo;
     // this.ubicacion = data.ubicacion;
      this.observaciones = data.observaciones;
      this.folio = data.folio;
      this.solicitud = data.noSolicitud;
      this.acuerdo = data.acuerdo;
      console.log(id);
    });
//para la aprobacion
    this.idsolicitud=id;
  }

  close() {
    this.display = 'none';
  }

  buscar(buscador) {
    this.p = 1;
   this.bajaService.buscarSolicitud(buscador.value).subscribe(res => { this.activo2 = res });
   }

   aprobarSolicitud() {
     //en id 
    var id=this.idsolicitud;
    Swal.fire({
      title: '¿Estas seguro de aprobar esta solicitud?',
      text: "No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Si, aprobar!'
    }).then((result) => {
      if (result.value) {
    this.bajaService.aceptarSolicitud(id).subscribe(res=>{
     // this.bajaService.guardarAcuerdo(id).subscribe(res=>{  });
      this.bajaService.cambiarEstadoAceptado(id).subscribe(res=>{  });
      
         //if(res==1){
          Swal.fire(
            'Solicitud aprobada!',
            'La solictud ha sido aprobada con éxito.',
            'success'   )
          this.display = 'none'; 
          this.bajaService.listarSolicitud().subscribe(res=>{
             this.activo2=res 
            });    
        //}      
   });
        
  }
  })
  }//fin aprobar solicitud


//negar la solicitud
negarSolicitud() {
  //en id 
 var id=this.idsolicitud;
 Swal.fire({
   title: '¿Estas seguro de rechazar esta solicitud?',
   text: "No podras revertir esta accion!",
   icon: 'warning',
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   cancelButtonText:'Cancelar',
   confirmButtonText: 'Si, rechazar!'
 }).then((result) => {
   if (result.value) {
 this.bajaService.denegarSolicitud(id).subscribe(res=>{
  this.bajaService.cambiarEstadoRechazado(id).subscribe(res=>{
   
  });
      //if(res==1){
       Swal.fire(
         'Solicitud rechazada!',
         'La solictud ha sido rechazada con exito.',
         'success'
       )
       this.display = 'none'; 
       this.bajaService.listarSolicitud().subscribe(res=>{
          this.activo2=res 
         });
      
     //}      
});


}
})

}//fin negar solicitud


noRepetirAcuerdo(control: FormControl) {

  var promesa = new Promise((resolve, reject) => {

    if (control.value != "" && control.value != null) {

      this.bajaService.validarAcuerdo(this.solicitudes.controls["idsolicitud"].value, control.value)
        .subscribe(data => {
          if (data == 1) {
            resolve({ yaExisteAcuerdo: true });
          } else {
            resolve(null);
          }
        })
    }
  });
  return promesa;
}


}
