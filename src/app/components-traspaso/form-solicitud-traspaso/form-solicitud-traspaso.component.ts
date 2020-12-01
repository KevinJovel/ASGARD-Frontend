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
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


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
 

  constructor(private router: Router, private activateRoute: ActivatedRoute,private controlService:ControlService, private bajaService:BajaService
    ,private catalogosServices: CatalogosService, private TraspasoService: TraspasoService,private usuarioService:UsuarioService) 
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
    this.TraspasoService.listarActivosAsignados().subscribe(res => { this.activos = res });
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursal=data});//filtro
   // this.catalogosServices.getTipoDescargo().subscribe(data=>{this.descargo=data});//combo
    //listar en solicitud (empleados y area de negocio)
 //   this.TraspasoService.listarEmpleadosCombo().subscribe(res => { this.empleados = res });
    this.TraspasoService.listarAreaCombo().subscribe(res =>{this.areas=res});

     //Método para recuperar año
   this.controlService.mostrarAnio().subscribe((res)=> {
    this.fechaMaxima=`${res.anio}-12-31`;
    this.fechaMinima=`${(res.anio).toString()}-01-01`;
  });
  }

  guardarDatos(){
    // console.log("solicitud : "+this.solicitud.value.idTipo);
     if (this.solicitud.valid == true) {
       
       this.TraspasoService.guardarSolicitudTraspaso(this.solicitud.value).subscribe(data => { 
         //console.log("solicitud : "+this.solicitud);
         if(data==1){
         this.TraspasoService.cambiarEstadoSolicitud(this.solicitud.value).subscribe(data => {
            //listar bienes 
           this.TraspasoService.listarActivosAsignados().subscribe(res=>{ this.activos=res });
         });
         this.display = 'none';
        }//cierre del iff
       });
   //  });
     
   
       Swal.fire({
         position: 'center',
         icon: 'success',
         title: 'Solicitud Guardada con éxito',
         showConfirmButton: false,
         timer: 3000
       });
       this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Realizó una solicitud de traspaso de activo.`).subscribe();
      // this.solicitud.reset()
      
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

   //para nuevo responsable y area 
   this.solicitud.controls["idresponsable"].setValue(idempleado);
   this.solicitud.controls["areaanterior"].setValue(areadenegocio);
   this.solicitud.controls["responsableanterior"].setValue(responsable);
   
   //this.solicitud.controls["areadenegocio"].setValue(areadenegocio);
   //para listar el area
   //this.TraspasoService.listarActivosAsignados().subscribe(res => { this.activos = res });
   this.display = 'block';
  }
  
  buscar(buscador) {
    this.p = 1;
   this.bajaService.buscarBienAsig(buscador.value).subscribe(res => { this.activos = res });
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
