import { Component, OnInit, ViewChild} from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
//para filtro de areas y sucursales
import { CatalogosService } from './../../services/catalogos.service';

@Component({
  selector: 'app-cuadro-solicitud',
  templateUrl: './cuadro-solicitud.component.html',
  styleUrls: ['./cuadro-solicitud.component.css']
})
export class CuadroSolicitudComponent implements OnInit {

  solicitud: FormGroup;
  datosbien:FormGroup;
  solicitudes: any;
  acti: any;
  activo: any;
  display = 'none';
  titulo: string;
  //parametro: string;
  p: number = 1;
//para filtro
  areas: any;
  sucursal: any;

 //Variables de etiqueta
 disabledentidad: string;
 disableddomicilio: string;
 disabledcontacto: string;
 disabledtelefono: string;
 disabled: boolean;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private bajaService:BajaService
    ,private catalogosServices: CatalogosService) 
  {
    this.solicitud = new FormGroup({
      'idsolicitud': new FormControl("0"),
       'folio': new FormControl("",[Validators.required,Validators.maxLength(10)],this.noRepetirFolio1.bind(this)),
       'fechasolicitud': new FormControl("",[Validators.required]),
       'observaciones': new FormControl("",[Validators.required,Validators.maxLength(150), Validators.pattern("^[a-zA-ZñÑáéíóú]+$")]),
       'motivo': new FormControl("0"),
       'entidadbeneficiaria': new FormControl("",[Validators.maxLength(50), Validators.pattern("^[a-zA-ZñÑáéíóú]+$")]),
       'domicilio': new FormControl("",[Validators.maxLength(50)]),
       'contacto': new FormControl("",[Validators.maxLength(50)]),
       'telefono': new FormControl(""),
       'idbien': new FormControl("0"),
       //para filtro
       'idArea': new FormControl("0"),
       'idSucursal': new FormControl("0")
    });
 
  }


   ngOnInit() {
    this.bajaService.listarBienes().subscribe(res => { this.activo = res });
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursal=data});//filtro

        this.disabledentidad = 'Ingrese entidad';
        this.disableddomicilio = 'Ingrese domicilio';
        this.disabledcontacto = 'Ingrese nombre del contacto';
        this.disabledtelefono = 'Ingrese teléfono';
  }

  guardarDatos(){
      //if ((this.solicitud.controls["bandera"].value) == "0") {
        //console.log(this.solicitud.valid);
        if (this.solicitud.valid == true) {

          this.bajaService.guardarSolicitud(this.solicitud.value).subscribe(data => { 
            console.log(this.solicitud.value);
            this.bajaService.guardarBien(this.solicitud.value).subscribe(data => {
               //listar bienes 
              this.bajaService.listarBienes().subscribe(res=>{ this.activo=res });
            });
              
            //enviamos cero para guardar.
            //this.solicitud.controls["idBien"].setValue("0");
            this.solicitud.controls["entidadbeneficiaria"].setValue("0");
            this.solicitud.controls["domicilio"].setValue("0");
            this.solicitud.controls["contacto"].setValue("0");
            this.solicitud.controls["telefono"].setValue("0");
            this.display = 'none';
            //this.solicitud["idbien"].patchValue("");
            
          });
      //  });
      
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Solicitud Guardada con éxito',
            showConfirmButton: false,
            timer: 3000
          })
         // this.solicitud.reset()
         
        }
     // }
  }
  
  open(id) {
    //limpia cache
    this.titulo = "Solicitud para dar de baja";
    //this.solicitud.controls["idBien"].setValue("0");
    this.solicitud.controls["idsolicitud"].setValue("0");
    this.solicitud.controls["folio"].setValue("");
    this.solicitud.controls["fechasolicitud"].setValue("");
    this.solicitud.controls["folio"].setValue("");
    this.solicitud.controls["observaciones"].setValue("");
    this.solicitud.controls["entidadbeneficiaria"].setValue("");
    this.solicitud.controls["domicilio"].setValue("");
    this.solicitud.controls["contacto"].setValue("");
    this.solicitud.controls["telefono"].setValue("");
    this.solicitud.controls["idbien"].setValue(id);
    this.display = 'block';
  }

  close() {
    this.display = 'none';
  }

  onSubmit() {
    if (this.solicitud.valid) {
     // console.log("Form Submitted!");
      this.solicitud.reset();
    }
  }

  buscar(buscador) {
    this.p = 1;
   this.bajaService.buscarBien(buscador.value).subscribe(res => { this.activo = res });
   }

   MotivoBaja() {
    let idmotivo = this.solicitud.controls['motivo'].value;
    if (idmotivo ==1 || idmotivo ==2 || idmotivo ==3 || idmotivo ==4  || idmotivo ==5 || idmotivo ==6  ) {
      this.disabledentidad = 'Inhabilitado';
      this.disableddomicilio = 'Inhabilitado';
      this.disabledcontacto = 'Inhabilitado';
      this.disabledtelefono = 'Inhabilitado';

      this.solicitud.controls["entidadbeneficiaria"].setValue("");
      this.solicitud.controls["domicilio"].setValue("");
      this.solicitud.controls["contacto"].setValue("");
      this.solicitud.controls["telefono"].setValue("");

      if (idmotivo ==4 ) {
        this.disabled = false;
        this.disabledentidad = 'Ingrese entidad';
        this.disableddomicilio = 'Ingrese domicilio';
        this.disabledcontacto = 'Ingrese contacto';
        this.disabledtelefono = 'Ingrese teléfono';
        //limpia cache
        this.solicitud.controls["entidadbeneficiaria"].setValue("");
        this.solicitud.controls["domicilio"].setValue("");
        this.solicitud.controls["contacto"].setValue("");
        this.solicitud.controls["telefono"].setValue("");
      } else {
        this.disabled = true;    
      }    
    } 
    console.log(idmotivo);
  }

  noRepetirFolio1(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.bajaService.validarFolio(this.solicitud.controls["idsolicitud"].value, control.value)
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


  FiltrarArea(){
    var id= this.solicitud.controls['idSucursal'].value;
    this.bajaService.ComboArea(id).subscribe(data=>{this.areas=data});
  }

  Filtrar(){
    var id= this.solicitud.controls['idArea'].value;
    this.bajaService.FiltroTablaActivos(id).subscribe(data=>{this.activo=data});
  }
  
  Reload(){
    this.solicitud.controls['idSucursal'].setValue(0);
    this.solicitud.controls['idArea'].setValue(0);
    this.bajaService.listarBienes().subscribe(res=> { this.activo=res});
  }

  //validar formularios que permita solo letras
  //public inputValidator(event: any) {
    ////console.log(event.target.value);
  //const pattern = /^[a-z A-Z]*$/;   
    ////let inputChar = String.fromCharCode(event.charCode)
  //if (!pattern.test(event.target.value)) {
  //event.target.value = event.target.value.replace(/[^a-z A-Z]/g, "");
     // // invalid character, prevent input

   // }
  //}

  
}
