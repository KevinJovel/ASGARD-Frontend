import { Component, OnInit, ViewChild} from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
//para filtro de areas y sucursales
import { CatalogosService } from './../../services/catalogos.service';
import { ControlService } from './../../services/control.service';
//para la fecha actual
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-cuadro-solicitud',
  templateUrl: './cuadro-solicitud.component.html',
  styleUrls: ['./cuadro-solicitud.component.css'],
  providers: [DatePipe]
})
export class CuadroSolicitudComponent implements OnInit {

  solicitud: FormGroup;
 //Para la fecha
 fechaMaxima: any;
 fechaMinima: any;
  acti: any;
  activo: any;
  display = 'none';
  titulo: string;
  p: number = 1;
//para filtro
  areas: any;
  sucursal: any;
  descargo: any;
 

  constructor(private router: Router,private controlService:ControlService, private activateRoute: ActivatedRoute, private bajaService:BajaService
    ,private catalogosServices: CatalogosService) 
  {
    this.solicitud = new FormGroup({
      'idsolicitud': new FormControl("0"),
      'idTipo': new FormControl("",[Validators.required, Validators.min(1)]),
      'idtipodescargo': new FormControl("",[Validators.required]),
       'folio': new FormControl("",[Validators.required,Validators.maxLength(10),Validators.pattern("^[a-z A-Z 0-9 ñÑáÁéÉíÍóÓúÚ -.]+$")],this.noRepetirFolio1.bind(this)),
       'fechasolicitud': new FormControl("",[Validators.required]),
       'observaciones': new FormControl("",[Validators.required,Validators.maxLength(150), Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ ,.]+$")]),
       'entidadbeneficiaria': new FormControl("",[Validators.maxLength(80), Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ]+$")]),
       'domicilio': new FormControl("",[Validators.maxLength(100),Validators.pattern("^[a-z A-Z 0-9 ñÑáÁéÉíÍóÓúÚ #°.]+$")]),
       'contacto': new FormControl("",[Validators.maxLength(50),Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ]+$")]),
       'telefono': new FormControl(""),
       'idbien': new FormControl("0"),
       
    });
    
  }

   ngOnInit() {
    this.bajaService.listarBienesNoAsignados().subscribe(res => { this.activo = res });
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursal=data});//filtro
    this.catalogosServices.getTipoDescargo().subscribe(data=>{this.descargo=data});//combo
   //Método para recuperar año
   this.controlService.mostrarAnio().subscribe((res)=> {
    this.fechaMaxima=`${res.anio}-12-31`;
    this.fechaMinima=`${(res.anio).toString()}-01-01`;
  });
  }

  guardarDatos(){
       // console.log("solicitud : "+this.solicitud.value.idTipo);
        if (this.solicitud.valid == true) {
          this.solicitud.controls["idtipodescargo"].setValue(this.solicitud.value.idTipo);
          
          this.bajaService.guardarSolicitud(this.solicitud.value).subscribe(data => { 
            //console.log("solicitud : "+this.solicitud.value.idTipo);
            this.bajaService.guardarBien(this.solicitud.value).subscribe(data => {
               //listar bienes 
              this.bajaService.listarBienesNoAsignados().subscribe(res=>{ this.activo=res });
            });
            this.display = 'none';
            
          });
      //  });
      
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Solicitud guardada con éxito',
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
    this.solicitud.controls["idTipo"].setValue("0");
    this.solicitud.controls["idtipodescargo"].setValue("0");
    this.solicitud.controls["idsolicitud"].setValue("0");
    this.solicitud.controls["folio"].setValue("");
    this.solicitud.controls["fechasolicitud"].setValue("");
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
   this.bajaService.buscarBienNoA(buscador.value).subscribe(res => { this.activo = res });
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




  
}
