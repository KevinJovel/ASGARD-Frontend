import { Component, OnInit} from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { UsuarioService } from './../../services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ControlService } from './../../services/control.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  activo2: any;
  idsolicitud: any;
  display = 'none';
  titulo: string;
  p: number = 1;
  solicitudes: FormGroup;
  bienesS: any;
   //Para la fecha
   fechaMaxima: any;
   fechaMinima: any;

  fecha2:string; marca:string; area:string;  responsable:string; 
  codigo:string; descripcion:string;  nombredescargo:string; entidad:string; observaciones:string; ubicacion:string;
  cargo:string; folio:string; solicitud: string; acuerdo: string;
 
  constructor(private router: Router, private activateRoute: ActivatedRoute, 
    private bajaService:BajaService, private controlService: ControlService, private usuarioService:UsuarioService)
  { 
    this.solicitudes = new FormGroup({
      'idsolicitud': new FormControl("0"),
      'acuerdo': new FormControl("",[Validators.required,Validators.maxLength(30), Validators.pattern("^[a-z A-Z 0-9 ñÑáÁéÉíÍóÓúÚ #°.-]+$")],this.noRepetirAcuerdo.bind(this)),
      'fecha2': new FormControl("",[Validators.required])
    });
  }

  ngOnInit() {
       //METODO PARA TABLA VACIA
       this.bajaService.validarSolicitudesParaBaja().subscribe(res => {
        if (res == 1) {
          
          this.bajaService.listarSolicitud().subscribe(res=>{ this.activo2=res });
        } else {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'No se encontraron solicitudes de baja.',
            showConfirmButton: false,
            timer: 4000
          });
          this.router.navigate(["/"]);
        }
      })
   
  }

  verSolicitud(id, fecha) {
    this.solicitudes.controls["fecha2"].setValue(fecha);
    var fecharecup = this.solicitudes.controls["fecha2"].value.split("-");
    let dia=fecharecup[0];
    let mes=fecharecup[1];
    let anio=fecharecup[2];
    this.controlService.mostrarAnio().subscribe((res)=> {
      this.fechaMaxima=`${res.anio}-12-31`;
      this.fechaMinima=`${anio}-${mes}-${dia}`;
    });
    this.display = 'block';
    this.titulo = "Autorización de solicitud para dar de baja";
    this.solicitudes.controls["acuerdo"].setValue("");//limpia cache
    this.solicitudes.controls["fecha2"].setValue("");
    this.bajaService.verSolicitud(id).subscribe((data) => {
 
      this.fecha2 = data.fechacadena;
      this.codigo = data.codigo;
      this.descripcion = data.descripcion;
      this.nombredescargo = data.nombredescargo;
      this.observaciones = data.observaciones;
      this.folio = data.folio;
      this.solicitud = data.noSolicitud;  
     this.bienesS = data.idbien;
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
    //var idsolicitud=this.idsolicitud;
    this.acuerdo = this.solicitudes.value.acuerdo;
    this.fecha2 = this.solicitudes.value.fecha2;
    //console.log("Este de Acuerdo: "+this.fecha2);
    Swal.fire({
      title: '¿Estás seguro de aprobar esta solicitud?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: '¡Si, aprobar!'
    }).then((result) => {
      if (result.value) {
    this.bajaService.aceptarSolicitud(id).subscribe(res=>{
         if(res==1){
          Swal.fire({
            icon: 'success',
            title: '¡Aprobada!',
            text: 'La solicitud ha sido aprobada con éxito.',
            confirmButtonText: 'Aceptar'
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Aprobó una solicitud de baja de activos.`).subscribe();
          this.display = 'none'; 
          this.bajaService.listarSolicitud().subscribe(res=>{ this.activo2=res });
        //  console.log("IdSoliiii: "+id);
         }      
   });   
   this.bienesS=id;// este cambio se hace para guardar el id de la solicitud en lugar del bien
       this.bajaService.cambiarEstadoAceptado(this.bienesS, this.acuerdo, this.fecha2).subscribe(rest=>{ });
      // console.log("fecha: "+ this.fecha2);
  }// del result
  })//de la alerta

  }//fin aprobar solicitud

//negar la solicitud
negarSolicitud() {
  var id=this.idsolicitud;
  this.acuerdo = this.solicitudes.value.acuerdo;
  this.fecha2 = this.solicitudes.value.fecha2;
    //console.log("Este de Acuerdo: "+this.acuerdo);
    Swal.fire({
      title: '¿Estás seguro de negar esta solicitud?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: '¡Sí, denegar!'
    }).then((result) => {
      if (result.value) {
    this.bajaService.denegarSolicitud(id).subscribe(res=>{
         if(res==1){
          Swal.fire({
            icon: 'success',
            title: '¡Denegada!',
            text: 'La solicitud ha sido denegada con éxito.',
            confirmButtonText: 'Aceptar'
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Denegó una solicitud de baja de activos.`).subscribe()
          this.display = 'none'; 
          this.bajaService.listarSolicitud().subscribe(res=>{ this.activo2=res });
         }      
   });   
   this.bienesS=id; //almacenamos el id de la solicitud en lugar del bien
   this.bajaService.cambiarEstadoDenegado(this.bienesS).subscribe(rest=>{ });
      
  }// del result
  })//de la alerta
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
