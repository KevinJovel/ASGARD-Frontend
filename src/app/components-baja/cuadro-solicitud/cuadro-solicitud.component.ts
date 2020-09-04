import { Component, OnInit, ViewChild} from '@angular/core';
import { BajaService } from './../../services/baja.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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

 //Variables de etiqueta
 disabledentidad: string;
 disableddomicilio: string;
 disabledcontacto: string;
 disabledtelefono: string;
 disabled: boolean;

  constructor(private router: Router, private activateRoute: ActivatedRoute, private bajaService:BajaService) 
  {
    this.solicitud = new FormGroup({
      'idsolicitud': new FormControl("0"),
       'folio': new FormControl("",[Validators.required,Validators.maxLength(10)],this.noRepetirFolio1.bind(this)),
       'fechasolicitud': new FormControl("",[Validators.required]),
       'observaciones': new FormControl("",[Validators.required,Validators.maxLength(150)]),
       'motivo': new FormControl("0"),
       'entidadbeneficiaria': new FormControl("",[Validators.maxLength(50)]),
       'domicilio': new FormControl("",[Validators.maxLength(50)]),
       'contacto': new FormControl("",[Validators.maxLength(50)]),
       'telefono': new FormControl(""),
       'idbien': new FormControl("0")
    });
    this.datosbien=new FormGroup({
      'idBienBaja': new FormControl("0"),
      'idBien': new FormControl("0"),
    });
  }


   ngOnInit() {
    this.bajaService.listarBienes().subscribe(res => { this.activo = res });

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

      if (idmotivo ==4 ) {
        this.disabled = false;
        this.disabledentidad = 'Ingrese entidad';
        this.disableddomicilio = 'Ingrese domicilio';
        this.disabledcontacto = 'Ingrese contacto';
        this.disabledtelefono = 'Ingrese teléfono';
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


}
