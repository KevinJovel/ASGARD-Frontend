import { Component, OnInit } from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { UsuarioService } from './../../services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
//para filtro de areas y sucursales
import { CatalogosService } from './../../services/catalogos.service';
import { ControlService } from './../../services/control.service';
import { TraspasoService } from 'src/app/services/traspaso.service';
import { SeguridadService } from 'src/app/services/seguridad.service';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';



//para la fecha actual
@Component({
  selector: 'app-form-solicitud-traspaso',
  templateUrl: './form-solicitud-traspaso.component.html',
  styleUrls: ['./form-solicitud-traspaso.component.css']
})
export class FormSolicitudTraspasoComponent implements OnInit {
 
  solicitud: FormGroup;
  acti: any;
  activos: any;
  descargo: any;
  display = 'none';
  titulo: string;
  p: number = 1;
//para filtro
  areas: any;
  sucursal: any;
   //Para la fecha
 fechaMaxima: any;
 fechaMinima: any;
 empleados: any;
 //variables para division
 isAdmin: boolean = false;
 tipoUsuario = sessionStorage.getItem("tipo");
 idEmpleado = sessionStorage.getItem("empleado");
banderaBuscador:number=1;
  constructor(private router: Router, private activateRoute: ActivatedRoute,private controlService:ControlService, private bajaService:BajaService
    ,private catalogosServices: CatalogosService, private TraspasoService: TraspasoService,private usuarioService:UsuarioService,private seguridadService:SeguridadService) 
  {
    this.solicitud = new FormGroup({
      'idsolicitud': new FormControl("0"),
       'folio': new FormControl("",[Validators.required,Validators.maxLength(10),Validators.pattern("^[a-z A-Z 0-9 ñÑáÁéÉíÍóÓúÚ -]+$")],this.noRepetirFolio1.bind(this)),
       'fechasolicitud': new FormControl("",[Validators.required]),
       'descripcion': new FormControl("",[Validators.required,Validators.maxLength(250), Validators.pattern("^[a-z A-Z 0-9 ñÑáÁéÉíÍóÓúÚ ,.]+$")]),
       'idresponsable': new FormControl("0",[Validators.required]),
       'nuevoresponsable': new FormControl(""),
       'nuevaarea': new FormControl("0",[Validators.required]),
       'responsableanterior': new FormControl(""),
       'areaanterior': new FormControl(""),
       'idbien': new FormControl(""),
       'idArea': new FormControl("0"),
       'idSucursal': new FormControl("0")
    });
  }

   ngOnInit() {
  //METODO PARA TABLA VACIA
  this.TraspasoService.validarActivosAsignados().subscribe(res => {
    if (res == 1) {
     // this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Consultó los activos en mantenimiento.`).subscribe();
     if(this.tipoUsuario=="1"){
      this.TraspasoService.listarActivosAsignados().subscribe(res => { this.activos = res });
      this.isAdmin=true;
      this.banderaBuscador==1;
     }else{
      this.seguridadService.getActivosTraspasoJefe(this.idEmpleado).subscribe(res => { this.activos = res });
      this.isAdmin=false;
      this.banderaBuscador=2;
    }
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursal=data});//filtro
    this.TraspasoService.listarAreaCombo().subscribe(res =>{this.areas=res});
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'No se encontraron activos en mantenimiento.',
        showConfirmButton: false,
        timer: 4000
      });
      this.router.navigate(["/"]);
    }
  })



     this.controlService.mostrarAnio().subscribe((res)=> {
      this.fechaMaxima=`${res.anio}-12-31`;
      this.fechaMinima=`${(res.anio).toString()}-01-01`;
    });
  }

  guardarDatos(){
     if (this.solicitud.valid == true) {    
       this.TraspasoService.guardarSolicitudTraspaso(this.solicitud.value).subscribe(data => { 
         if(data==1){
         this.TraspasoService.cambiarEstadoSolicitud(this.solicitud.value).subscribe(data => {
           if(data==1){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Solicitud Guardada con éxito',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Realizó una solicitud de traspaso de activo.`).subscribe();
            if(this.tipoUsuario=="1"){
              this.TraspasoService.listarActivosAsignados().subscribe(res => { this.activos = res });
              this.isAdmin=true;
              this.banderaBuscador==1;
             }else{
              this.seguridadService.getActivosTraspasoJefe(this.idEmpleado).subscribe(res => { this.activos = res });
              this.isAdmin=false;
              this.banderaBuscador=2;
            }
           }
         });
         this.display = 'none';
        }
       });
     }else{
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Ocurrió un error',
      })
     }
  // }
}
  close() {  
    
    this.solicitud.controls["idresponsable"].setValue("0");
    this.display = 'none';
    
  }

  onSubmit() {
    if (this.solicitud.valid) {
     // console.log("Form Submitted!");
      this.solicitud.reset();
    }
  }

  open(id,idempleado,areadenegocio,responsable,fecha) {
    this.solicitud.controls["fechasolicitud"].setValue(fecha);
    var fecharecup = this.solicitud.controls["fechasolicitud"].value.split("-");
    let dia = fecharecup[0];
    let mes = fecharecup[1];
    let anio = fecharecup[2];
    this.controlService.mostrarAnio().subscribe((res) => {
      if (res.anio > anio) {
        this.fechaMinima = `${res.anio}-01-01`;
      } else {
        this.fechaMinima = `${anio}-${mes}-${dia}`;
      }
      this.fechaMaxima = `${res.anio}-12-31`;
    });
   //limpia cache
   this.titulo = "Solicitud de traspaso";
   this.solicitud.controls["idsolicitud"].setValue("0");
   this.solicitud.controls["folio"].setValue("");
  // this.solicitud.controls["fechasolicitud"].setValue("");
   this.solicitud.controls["descripcion"].setValue("");
   this.solicitud.controls["nuevoresponsable"].setValue("");
   this.solicitud.controls["nuevaarea"].setValue("");
   this.solicitud.controls["idbien"].setValue(id);
   this.solicitud.controls["idresponsable"].setValue(idempleado);
   this.solicitud.controls["areaanterior"].setValue(areadenegocio);
   this.solicitud.controls["responsableanterior"].setValue(responsable);
   this.display = 'block';
  }
  
  buscar(buscador) {
    this.p = 1;
    if(this.banderaBuscador==1){
      this.TraspasoService.buscarActivosTraspaso(buscador.value).subscribe(res => { this.activos = res });
    }else{
      this.seguridadService.BuscarBienTraspasoJefe(this.idEmpleado,buscador.value).subscribe(res => { this.activos = res });
    }

   }
 
  FiltrarArea(){
    var id= this.solicitud.controls['idSucursal'].value;
    this.controlService.comboAreaDeSucursal(id).subscribe(data=>{this.areas=data});
  }

  Filtrar(){
    var id= this.solicitud.controls['idArea'].value;
    this.TraspasoService.listarActivosFiltroT(id).subscribe(data=>{this.activos=data});
  }

  
  Reload(){
    this.solicitud.controls['idSucursal'].setValue(0);
    this.solicitud.controls['idArea'].setValue(0);
    this.TraspasoService.listarActivosAsignados().subscribe(res => { this.activos = res});
  }

  noRepetirFolio1(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.TraspasoService.validarFolio(this.solicitud.controls["idsolicitud"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteFolio: true });
            } else {
              resolve(null);
            }
          })
      }
    });
    return promesa;
  }

  //A FILTRAR EL EMPLEADO SEGUN AREA DE NEGOCIO
  FiltrarEmpleado(){
    var id= this.solicitud.controls['nuevaarea'].value;
    var idresponsable= this.solicitud.controls['idresponsable'].value
    this.TraspasoService.comboEmpleados(id,idresponsable).subscribe(data=>{this.empleados=data});
  }

 //creo que lo ocuparé despues.
  Gcodigo() {
    if (this.activos.controls["idEmpleado"].value == 0) {
      Swal.fire({
        icon: 'error',
        title: 'ERROR',
        text: 'Seleccione un empleado para generar el codigos',
      })
    } else {
      var idempleado = this.activos.controls["idEmpleado"].value;
      var idbien = this.activos.controls["idBien"].value;
      this.controlService.GenerarCodigo(idempleado, idbien).subscribe(data => {
        var correlativoSucursal = data.correlativoSucursal;
        var correlativoArea = data.correlativoArea;
        var correlativoClasificacion = data.correlativoClasificacion;
        var correlativo = data.correlativo;
        this.activos.controls["codigo"].setValue(correlativoSucursal + "-" + correlativoArea + "-" + correlativoClasificacion + "-" + correlativo);
      });
    }
  }
}
