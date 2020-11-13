import { Component, OnInit, ViewChild} from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TraspasoService } from 'src/app/services/traspaso.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tabla-solicitud-traspaso',
  templateUrl: './tabla-solicitud-traspaso.component.html',
  styleUrls: ['./tabla-solicitud-traspaso.component.css']
})
export class TablaSolicitudTraspasoComponent implements OnInit {


  solicitudesTraspasos: any;
  idsolicitud: any;
  display = 'none';
  titulo: string;
  p: number = 1;
  solicitudes: FormGroup;
  idactivado: any;

  fechasolicitud:string; nuevoresponsable:string;  nuevaarea:string; area:string;  responsable:string; 
  codigo:string; descripcion:string;  nombredescargo:string; entidad:string; observaciones:string; ubicacion:string;
  cargo:string; folio:string; solicitud: string; acuerdo: string;
 
  constructor(private router: Router, private activateRoute: ActivatedRoute, 
    private bajaService:BajaService, private TraspasoService: TraspasoService)
  { 
    this.solicitudes = new FormGroup({
      'idsolicitud': new FormControl("0"),
       'acuerdo': new FormControl("",[Validators.required]),
       'fechasolicitud': new FormControl("",[Validators.required])
    });
  }

  ngOnInit() {
    this.TraspasoService.listarSolicitudTraspaso().subscribe(res=>{ this.solicitudesTraspasos=res });
   
  }

  guardarDatos(){ }

  verSolicitud(id) {
    this.display = 'block';
    this.titulo = "Autorización de solicitud para realizar traspaso";
    this.solicitudes.controls["acuerdo"].setValue("");//limpia cache
    this.solicitudes.controls["fechasolicitud"].setValue("");
    this.TraspasoService.verSolicitudTraspaso(id).subscribe((data) => {
 
      this.fechasolicitud = data.fechacadena;
      this.codigo = data.codigo;
      this.descripcion = data.descripcion;
      this.nombredescargo = data.nombredescargo;
      this.folio = data.folio;
      this.solicitud = data.noSolicitud;  
      this.responsable= data.responsableactual;
      this.area= data.areanegocioactual;
      this.nuevaarea= data.areanegocioanterior;
      this.nuevoresponsable= data.responsableanterior;
     this.idactivado = data.idbien; //para obtener el id del bien
    // console.log("Idbien: "+this.bienesS); 
    });
   
//para la aprobacion
    this.idsolicitud=id;
 
  }

  close() {
    this.display = 'none';
  }

  buscar(buscador) {
    this.p = 1;
   this.bajaService.buscarSolicitud(buscador.value).subscribe(res => { this.solicitudesTraspasos = res });
   }

   aprobarSolicitud() {
     //en id 
    var id=this.idsolicitud;
    //vamos a guardar el acuerdo y la solicitud
    this.acuerdo = this.solicitudes.value.acuerdo;
    this.fechasolicitud = this.solicitudes.value.fechasolicitud;
   // console.log("Este de Acuerdo: "+this.acuerdo);
    
    Swal.fire({
      title: '¿Estas seguro de aprobar esta solicitud?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: '¡Si, aprobar!'
    }).then((result) => {
      if (result.value) {
    this.TraspasoService.aceptarSolicitud(id).subscribe(res=>{
         if(res==1){
          Swal.fire({
            icon: 'success',
            title: '¡Aprobada!',
            text: 'La solicitud ha sido aprobada con éxito.',
            confirmButtonText: 'Aceptar'
        })
          this.display = 'none'; 
          this.TraspasoService.listarSolicitudTraspaso().subscribe(res=>{ this.solicitudesTraspasos=res });
         }//cierre de if      
   });   
   this.idactivado=id;// este cambio se hace para guardar el id de la solicitud en lugar del bien
       this.TraspasoService.cambiarEstadoAceptoTraspaso(this.idactivado, this.acuerdo, this.fechasolicitud).subscribe(rest=>{ });
       console.log("fecha: "+ this.fechasolicitud);
       console.log("acuerdo: "+ this.acuerdo);
  }// del result
  })//de la alerta

  }//fin aprobar solicitud

//negar la solicitud
denegarSolicitud() {
  var id=this.idsolicitud;
 // this.acuerdo = this.solicitudes.value.acuerdo;
 // this.fechasolicitud = this.solicitudes.value.fecha2;
    //console.log("Este de Acuerdo: "+this.acuerdo);
    Swal.fire({
      title: '¿Estas seguro de denegar esta solicitud?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: '¡Sí, denegar!'
    }).then((result) => {
      if (result.value) {
    this.TraspasoService.denegarSolicitud(id).subscribe(res=>{
         if(res==1){
          Swal.fire({
            icon: 'success',
            title: '¡Denegada!',
            text: 'La solicitud ha sido denegada con éxito.',
            confirmButtonText: 'Aceptar'
        })
          this.display = 'none'; 
          this.TraspasoService.listarSolicitudTraspaso().subscribe(res=>{ this.solicitudesTraspasos=res });
         }      
   });   
   this.idactivado=id; //almacenamos el id de la solicitud en lugar del bien
       this.TraspasoService.estadoSolicitudDenegada(this.idactivado).subscribe(rest=>{ });
  
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
