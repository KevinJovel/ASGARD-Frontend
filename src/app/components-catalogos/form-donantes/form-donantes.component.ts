import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-donantes',
  templateUrl: './form-donantes.component.html',
  styleUrls: ['./form-donantes.component.css']
})
export class FormDonantesComponent implements OnInit {

  //Variables 
  donantes: FormGroup;
  dontes: any;
  display = 'none';
  display3 = 'none';
  titulo: string;
  p: number = 1;

  constructor(private catalogoService: CatalogosService, private router: Router, private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService) {

    this.donantes = new FormGroup({
      'iidDonante': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")], this.noRepetirDonante.bind(this)),
      'bandera': new FormControl("0"),
      'telefono': new FormControl("", [Validators.required, Validators.maxLength(11)]),
      'direccion': new FormControl("", [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9ñÑáéíóú.´´,#+° ]+$")])
    });
  }

  ngOnInit() {
    this.catalogoService.getDonantes().subscribe(data => { this.dontes = data });
  }
  open() {
    //Limpiar
    this.titulo = "Formulario donante";
    this.donantes.controls["iidDonante"].setValue("0");
    this.donantes.controls["bandera"].setValue("0");
    this.donantes.controls["nombre"].setValue("");
    this.donantes.controls["telefono"].setValue("");
    this.donantes.controls["direccion"].setValue("");
    this.display = 'block';
  }

  close() {
    this.display = 'none';
  }
  open3() { //para modal de ayuda
    this.display3 = 'block';
  }
  close2() { //para modal de ayuda
    this.display3 = "none";
  }
  guardarDatos() {
    //Si la vandera es cero que es el que trae por defecto en el metodo open() entra en la primera a insertar
    if ((this.donantes.controls["bandera"].value) == "0") {
      if (this.donantes.valid == true) {
        this.catalogoService.agregarDonante(this.donantes.value).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Registro guardado con éxito!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó un donante en el sistema.`).subscribe();
            this.catalogoService.getDonantes().subscribe(data => { this.dontes = data });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al guardar el registro!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó guardar un donante en el sistema.`).subscribe();
          }
        });
      }
    } else {
      //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar 
      this.donantes.controls["bandera"].setValue("0");
      if (this.donantes.valid == true) {
        this.catalogoService.updateDonante(this.donantes.value).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Registro modificado con éxito!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Modificó un donante en el sistema.`).subscribe();
            this.catalogoService.getDonantes().subscribe(data => { this.dontes = data });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al modificar el registro!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó modificar un donante en el sistema.`).subscribe();
          }
        });
      }
    }
    this.donantes.controls["iidDonante"].setValue("0");
    this.donantes.controls["bandera"].setValue("0");
    this.donantes.controls["nombre"].setValue("");
    this.donantes.controls["telefono"].setValue("");
    this.donantes.controls["direccion"].setValue("");
    this.display = 'none';
  }
  eliminar(iddonante) {
    Swal.fire({
      title: '¿Estás seguro de eliminar este registro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.catalogoService.eliminarDonante(iddonante).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              icon: 'success',
              title: '¡ELIMINADO!',
              text: '¡El registro ha sido eliminado con éxito!',
              confirmButtonText: 'Aceptar'
            })
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Eliminó un donante en el sistema.`).subscribe();
            this.catalogoService.getDonantes().subscribe(data => { this.dontes = data });
          } else {
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: '¡Ocurrió un error al eliminar el registro!',
              confirmButtonText: 'Aceptar'
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó eliminar un donante en el sistema.`).subscribe();
          }
        });
      }
    })
  }

  modif(id) {
    this.titulo = "Modificar donante";
    this.display = 'block';
    this.catalogoService.RecuperarDonante(id).subscribe(data => {
      this.donantes.controls['iidDonante'].setValue(data.iidDonante);
      this.donantes.controls['bandera'].setValue("1");
      this.donantes.controls['nombre'].setValue(data.nombre);
      this.donantes.controls['telefono'].setValue(data.telefono);
      this.donantes.controls['direccion'].setValue(data.direccion);
      this.catalogoService.getDonantes().subscribe(data => { this.dontes = data });
    });
  }

  buscar(buscador) {
    this.p = 1;
    this.catalogoService.buscarDonante(buscador.value).subscribe(res => this.dontes = res);
  }

  noRepetirDonante(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.catalogoService.validarDonante(this.donantes.controls["iidDonante"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteDonante: true });
            } else {
              resolve(null);
            }
          })
      }
    });
    return promesa;
  }
}
