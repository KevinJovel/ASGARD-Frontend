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
       'folio': new FormControl(""),
       'fechasolicitud': new FormControl(""),
       'observaciones': new FormControl(""),
       'motivo': new FormControl("0"),
       'entidadbeneficiaria': new FormControl(""),
       'domicilio': new FormControl(""),
       'contacto': new FormControl(""),
       'telefono': new FormControl(""),
       'idbien': new FormControl("0")
    });
    
   }

   ngOnInit() {
    this.bajaService.listarBienes().subscribe(res => { this.activo = res });

        this.disabledentidad = 'Ingrese entidad';
        this.disableddomicilio = 'Ingrese domicilio';
        this.disabledcontacto = 'Ingrese contacto';
        this.disabledtelefono = 'Ingrese telefono';
  }

  guardarDatos(){
      //if ((this.solicitud.controls["bandera"].value) == "0") {
        //console.log(this.solicitud.valid);
        if (this.solicitud.valid == true) {

          this.bajaService.guardarSolicitud(this.solicitud.value).subscribe(data => { 
            
            //listar bienes
           this.bajaService.listarBienes().subscribe(res=>{ this.activo=res });
            //enviamos cero para guardar
            this.solicitud.controls["entidadbeneficiaria"].setValue("0");
            this.solicitud.controls["domicilio"].setValue("0");
            this.solicitud.controls["contacto"].setValue("0");
            this.solicitud.controls["telefono"].setValue("0");
            this.display = 'none';
            this.solicitud["idbien"].patchValue("");
            console.log(this.solicitud.valid);
          });
      //  });
      
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registro Guardado con exito',
            showConfirmButton: false,
            timer: 3000
          })
          
          console.log(this.solicitud);
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

  buscar(buscador) {
    this.p = 1;
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
        this.disabledtelefono = 'Ingrese telfono';
      } else {
        this.disabled = true;
        
      }
      
    } console.log(idmotivo);
  }

}
