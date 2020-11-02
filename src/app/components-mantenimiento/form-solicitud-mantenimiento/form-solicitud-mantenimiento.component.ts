import { Component, OnInit } from '@angular/core';
import { MantenimientoService } from './../../services/mantenimiento.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ControlService } from './../../services/control.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-solicitud-mantenimiento',
  templateUrl: './form-solicitud-mantenimiento.component.html',
  styleUrls: ['./form-solicitud-mantenimiento.component.css']
})
export class FormSolicitudMantenimientoComponent implements OnInit {
  bienes: any;
  solicitudes: any;
  empleados: any;
  codigos: any;
  areas: any;
  solicitud: FormGroup;
  datosArray:FormGroup;
  titulo:String;
  display = 'none';
  display2 = 'none';
  p: number = 1;
  fechaMaxima: any;
  fechaMinima: any;
  matriz:(string | number)[][]=new Array();
  //Revisar esta fecha da problemas en la consola
 // fecha = Date.now();
  anio: string;
  yaHayDatos:boolean=false;
  
  constructor( private mantenimientoService: MantenimientoService,private controlService: ControlService) { 
    this.solicitud=new FormGroup({
       'idsolicitud': new FormControl("0"),
       'folio': new FormControl("",[Validators.required,Validators.maxLength(10),Validators.pattern("^[0-9-a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")],this.noRepetirFolio.bind(this)),
       'fechasolicitud': new FormControl("",[Validators.required]),
       'descripcion': new FormControl("",[Validators.required,Validators.maxLength(250),Validators.pattern("^[0-9-a-zA-ZñÑáéíóúÁÉÍÓÚ., ]+$")])
    }); 
    this.datosArray=new FormGroup({
      'idMantenimiento': new FormControl("0"),
      'idBien': new FormControl("0"),
      'codigobien':new FormControl(""),
      'descripcionbien':new FormControl(""),
      'razonesMantenimiento':new FormControl("",[Validators.required,Validators.maxLength(100),Validators.pattern("^[0-9-a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      'periodoMantenimiento':new FormControl("",[Validators.required,Validators.maxLength(25),Validators.pattern("^[0-9-a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")])
    });
  }

  ngOnInit(): void {
    this.mantenimientoService.getBienes().subscribe(data=>{this.bienes=data});
    this.mantenimientoService.getSolicitudMantenimiento().subscribe(data=>{
      this.solicitudes=data;
    });
  
    this.mantenimientoService.listarCodigoCombo().subscribe(data =>{
      this.codigos =data;
    });

     //Método para recuperar año
  this.controlService.mostrarAnio().subscribe((res)=> {
    this.fechaMaxima=`${res.anio}-12-31`;
    this.fechaMinima=`${(res.anio-10).toString()}-01-01`;
  });
  }
  CambiarEstado(){
    this.mantenimientoService.cambiarEstadoSolicitud(this.datosArray.controls["idBien"].value).subscribe(data=>{
      if(data==1){
        this.mantenimientoService.getBienes().subscribe(data=>{this.bienes=data});
      }
    });
  }
  // Metodo para validar si ya hay por lo menos un dato en la matriz y asi proceder a guardar
  ValidarDatosArray(){
  if(this.matriz.length>0){
      this.yaHayDatos=true;
  }else{
    this.yaHayDatos=false;
  }
  }
 
  //Metodo auxiliar para aegurarse que cargue los datos nuevos
  validarDatosEnArray(){
    this.mantenimientoService.getBienes().subscribe(data=>{
        this.bienes=data;
    });
  }
  //abre el modal con los datos
  open2() {
    this.validarDatosEnArray();
    this.titulo = "Activos a enviar a mantenimiento";
    this.display2 = 'block';
  }
//Metodo para los datos del modalito
  open(id,codigo,descripcion) {
    this.display2 = 'none';
    this.display = 'block';
    this.titulo = "Datos de mantenimiento";
    this.datosArray.controls["idBien"].setValue(id);
    this.datosArray.controls["codigobien"].setValue(codigo);
    this.datosArray.controls["descripcionbien"].setValue(descripcion);
    this.datosArray.controls["razonesMantenimiento"].setValue("");
    this.datosArray.controls["periodoMantenimiento"].setValue("");
  }
  close() {
    this.display = 'none';
    this.titulo = "Activos a enviar a mantenimiento";
    this.display2 = 'block';
  }
  close2() {
    this.display2 = 'none';
  }
//Manda los adtos al array y le cambia en estado en la base al activo
  arrayMostrar(){
    this.matriz.push([this.datosArray.controls["idBien"].value,this.datosArray.controls["codigobien"].value, 
    this.datosArray.controls["descripcionbien"].value,this.datosArray.controls["razonesMantenimiento"].value,
    this.datosArray.controls["periodoMantenimiento"].value]);
    this.CambiarEstado();
    this.display = 'none';
    this.display2 = 'none';
    this.mantenimientoService.getBienes().subscribe(data=>{
          this.bienes=data;
    });
    this. ValidarDatosArray();
    // Swal.fire({
    //   position: 'center',
    //   icon: 'success',
    //   title: '¡Datos agregados con éxito!',
    //   showConfirmButton: false,
    //   timer: 3000
    // })
  }
  noRepetirFolio(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.mantenimientoService.validarFolio(this.solicitud.controls["idsolicitud"].value, control.value)
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

  
  buscar(buscador) {
    this.p = 1;
    this.mantenimientoService.buscarBienescodigo(buscador.value).subscribe(res => {this.bienes = res});
  }

  guardarDatos() {
  this.mantenimientoService.guardarSolicitud(this.solicitud.value).subscribe(res=>{
  if(res==1){
    for (let datos of this.matriz) {
      this.datosArray.controls["idBien"].setValue(datos[0]);
      this.datosArray.controls["razonesMantenimiento"].setValue(datos[3]);
      this.datosArray.controls["periodoMantenimiento"].setValue(datos[4]);
     this.mantenimientoService.setSolicitud(this.datosArray.value).subscribe(data => {
      this.mantenimientoService.getBienes().subscribe(data=>{
        this.bienes=data;

      });
     });
    }
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: '¡Solicitud Guardada con éxito!',
      showConfirmButton: false,
      timer: 3000
    })
this.matriz=[],[];
this.solicitud.controls["folio"].setValue("");
this.solicitud.controls["descripcion"].setValue("");
this.solicitud.controls["fechasolicitud"].setValue("");

}else{
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Error al guardar',
      showConfirmButton: false,
      timer: 3000
    })
  }

}); 
  }
}