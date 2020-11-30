import { Component, OnInit, ViewChild} from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { UsuarioService } from './../../services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TraspasoService } from 'src/app/services/traspaso.service';
import Swal from 'sweetalert2';
import { ControlService } from './../../services/control.service';


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
  fechaMaxima: any;
  fechaMinima: any;

  fechasolicitud:string; nuevoresponsable:string;  nuevaarea:string; area:string;  responsable:string; 
  codigo:string; descripcion:string;  nombredescargo:string; entidad:string; observaciones:string; ubicacion:string;
  cargo:string; folio:string; solicitud: string; acuerdo: string; idresponsable: any;
 
  constructor(private router: Router, private activateRoute: ActivatedRoute, 
    private bajaService:BajaService, private TraspasoService: TraspasoService, private controlService: ControlService,private usuarioService:UsuarioService)
  { 
    this.solicitudes = new FormGroup({
      'idsolicitud': new FormControl("0"),
       'acuerdo': new FormControl("",[Validators.required,Validators.maxLength(50), Validators.pattern("^[a-z A-Z 0-9 ñÑáÁéÉíÍóÓúÚ ,.]+$")],this.noRepetirAcuerdo.bind(this)),
       'fechasolicitud': new FormControl("",[Validators.required]),
       'idEmpleado': new FormControl(""),
    });
  }

  ngOnInit() {
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Consultó las solicitudes de traspaso de activo.`).subscribe();
    this.TraspasoService.listarSolicitudTraspaso().subscribe(res=>{ this.solicitudesTraspasos=res });
   
  }

  guardarDatos(){ }

 

  close() {
    this.display = 'none';
  }
 // me falta el buscar
  buscar(buscador) {
    this.p = 1;
    this.TraspasoService.buscarSolicitud(buscador.value).subscribe(res => { this.solicitudesTraspasos = res });
   }
   open(id,fecha) {
    this.display = 'block';
    this.titulo = "Autorización de solicitud para realizar traspaso";
    
    this.solicitudes.controls["fechasolicitud"].setValue(fecha);
    var fecharecup = this.solicitudes.controls["fechasolicitud"].value.split("-");
    let dia=fecharecup[0];
    let mes=fecharecup[1];
    let anio=fecharecup[2];
    this.controlService.mostrarAnio().subscribe((res)=> {
      this.fechaMaxima=`${res.anio}-12-31`;
      this.fechaMinima=`${anio}-${mes}-${dia}`;
    });
    //limpia cache

    this.TraspasoService.verSolicitudTraspaso(id).subscribe((data) => {
      this.fechasolicitud = data.fechacadena;
      this.codigo = data.codigo;
      this.descripcion = data.descripcion;
      this.nombredescargo = data.nombredescargo;
      this.folio = data.folio;
      this.solicitud = data.noSolicitud;  
      this.responsable= data.responsableanterior;
      this.area=  data.areanegocioanterior;
      this.nuevaarea= data.areanegocioactual;
      this.nuevoresponsable= data.responsableactual;
      this.idactivado = data.idbien; //para obtener el id del bien
      //this.idresponsable= data.idresponsable;
      this.solicitudes.controls["idEmpleado"].setValue(data.idresponsable);
    });
    this.solicitudes.controls["acuerdo"].setValue("");
    this.solicitudes.controls["idsolicitud"].setValue(id);
  
    this.idsolicitud=id;
   
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
      console.log(this.solicitudes.value);
    this.TraspasoService.aceptarSolicitud(id).subscribe(res=>{
         if(res==1){
        this.TraspasoService.cambiarEstadoAceptoTraspaso(this.solicitudes.value).subscribe(rest=>{ 
          if(rest==1){
            Swal.fire({
              icon: 'success',
              title: '¡Aprobada!',
              text: 'La solicitud ha sido aprobada con éxito.',
              confirmButtonText: 'Aceptar'
          });
          this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Aprobó una solicitud de traspaso.`).subscribe();
          this.display = 'none'; 
          this.TraspasoService.listarSolicitudTraspaso().subscribe(res=>{ this.solicitudesTraspasos=res });
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'Ocurrió un error.',
              confirmButtonText: 'Aceptar'
          })
          }
         });
           }//cierre de if      
   });   
   this.idactivado=id;// este cambio se hace para guardar el id de la solicitud en lugar del bien
    
    
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
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Denegó una solicitud de traspaso.`).subscribe();
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

      this.TraspasoService.validarAcuerdo(this.solicitudes.controls["idsolicitud"].value, control.value)
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
