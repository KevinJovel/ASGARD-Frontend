import { Component, OnInit } from '@angular/core';
import { ConfiguracionService } from './../../services/configuracion.service';
import { ControlService } from './../../services/control.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-coope',
  templateUrl: './form-coope.component.html',
  styleUrls: ['./form-coope.component.css']
})
export class FormCoopeComponent implements OnInit {
  //Variables
  cooperativa: FormGroup;
  cooperativas: any;
  display = 'none';
  display2 = 'none';
  display3 = 'none';
  p: number = 1;
  logo: any;
  titulo: string;
  aniomodif: boolean;

  constructor(private configuracionService: ConfiguracionService, private controlService: ControlService) {
    this.cooperativa = new FormGroup({

      'idcooperativa': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(35), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ. ]+$")], this.noRepetirCooperativa.bind(this)),
      'logo': new FormControl(""),
      'anio': new FormControl("", [Validators.required]),
      'descripcion': new FormControl("", [Validators.required, Validators.maxLength(150), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ,. ]+$")])

    });
  }

  ngOnInit() {
    this.configuracionService.getCooperativa().subscribe(data => { this.cooperativas = data });
  }

  //Métodos
  open() {
    //Limpiar
    this.cooperativa.controls["idcooperativa"].setValue("0");
    this.cooperativa.controls["bandera"].setValue("0");
    this.cooperativa.controls["nombre"].setValue("");
    this.cooperativa.controls["logo"].setValue("");
    this.cooperativa.controls["anio"].setValue("");
    this.cooperativa.controls["descripcion"].setValue("");
    this.display = 'block';
  }

  close() {
    this.display = 'none';
  }

  close2() {
    this.display2 = 'none';
  }
  open3() { //para modal de ayuda
    this.display3 = 'block';
  }
  close3() { //para modal de ayuda
    this.display3 = "none";
  }

  //Evento para guardar foto
  changeFoto() {
    var file = (<HTMLInputElement>document.getElementById("futFoto")).files[0];
    var fileReader = new FileReader();

    fileReader.onloadend = () => {
      this.logo = fileReader.result;
    }

    fileReader.readAsDataURL(file);
  }


  mostrarLogo(id) {
    this.display2 = 'block';
    this.configuracionService.recuperarCooperativa(id).subscribe(data => {
      this.cooperativa.controls["idcooperativa"].setValue(data.idcooperativa);
      this.cooperativa.controls["nombre"].setValue(data.nombre);
      if (data.logo == null) {
        this.logo = "";
      } else {
        this.logo = data.logo;
      }


    });
  }

  noRepetirCooperativa(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.configuracionService.validarCooperativa(this.cooperativa.controls["idcooperativa"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteCooperativa: true });
            } else {
              resolve(null);
            }

          })

      }


    });

    return promesa;
  }
  modif(id) {
    //Limpiar
    this.configuracionService.recuperarCooperativa(id).subscribe(res => {
      this.cooperativa.controls["idcooperativa"].setValue(res.idcooperativa);
      this.cooperativa.controls["nombre"].setValue(res.nombre);
      if (res.logo == null) {
        this.logo = "";
      } else {
        this.logo = res.logo;
      }
      this.controlService.validarActivosTransacciones().subscribe(res => {
        if (res == 1) {
          // this.depreciacionService.getCuadroControl().subscribe(data=> {this.cuadros=data});
          this.aniomodif = true;
        } else {
          this.aniomodif = false;
        }
      });
      this.cooperativa.controls["anio"].setValue(res.anio);
      this.cooperativa.controls["descripcion"].setValue(res.descripcion);
      this.display = 'block';
    });

  }
  modificarDatos() {
    if (this.cooperativa.valid == true) {
      this.cooperativa.controls["logo"].setValue(this.logo);
      console.log(this.cooperativa.value);
      this.configuracionService.updateCooperativa(this.cooperativa.value).subscribe(res => {
        if (res == 1) {
          Swal.fire({
            icon: 'success',
            title: '¡Registro modificado con exito!',
            // text: 'No es posible eliminar este registro, esta categoía ya tiene activos asignados.',
            confirmButtonText: 'Aceptar'

          });
          this.display = 'none';
          this.configuracionService.getCooperativa().subscribe(data => { this.cooperativas = data });
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡Ocurrio un error!',
            // text: 'No es posible eliminar este registro, esta categoía ya tiene activos asignados.',
            confirmButtonText: 'Aceptar'

          })
        }
      });

    }
  }
}
