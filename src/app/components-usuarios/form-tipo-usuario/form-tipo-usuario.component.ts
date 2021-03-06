import { Component, OnInit } from '@angular/core';
//importamos
import { UsuarioService } from '../../services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-tipo-usuario',
  templateUrl: './form-tipo-usuario.component.html',
  styleUrls: ['./form-tipo-usuario.component.css']
})
export class FormTipoUsuarioComponent implements OnInit {

  tipoUsuario: FormGroup;
  tipoUsuarios: any;
  titulo: string = "";
  display = 'none';
  p: number = 1;

  //los servicio se colocan en el constructor y el activatedRoute
  constructor(private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

    this.tipoUsuario = new FormGroup({
      "iidtipousuario": new FormControl("0"),
      'bandera': new FormControl("0"),
      "tipo": new FormControl("", [Validators.required, Validators.maxLength(50)], this.noRepetirTipoUsuario.bind(this)),
      "descripcion": new FormControl("", [Validators.maxLength(100)]),
      //creamos una variable opcional
      //"valores": new FormControl("")
    });

  }
  ngOnInit() {
    this.usuarioService.listarTipoUsuarios().subscribe(res => { this.tipoUsuarios = res });
  }

  open() {
    //limpia cache
    this.titulo = "Formulario registro tipo usuario";
    this.tipoUsuario.controls["iidtipousuario"].setValue("0");
    this.tipoUsuario.controls["bandera"].setValue("0");
    this.tipoUsuario.controls["tipo"].setValue("");
    this.tipoUsuario.controls["descripcion"].setValue("");
    this.display = 'block';

  }

  close() {
    this.display = 'none';
  }

  guardarDatos() {
    if ((this.tipoUsuario.controls["bandera"].value) == "0") {
      if (this.tipoUsuario.valid == true) {
        this.usuarioService.agregarTipoUsuario(this.tipoUsuario.value).subscribe(data => {
          this.usuarioService.listarTipoUsuarios().subscribe(res => { this.tipoUsuarios = res });
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Guardado con exito',
          showConfirmButton: false,
          timer: 3000
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó un tipo de usuario.`).subscribe();
      }
    } else {
      this.tipoUsuario.controls["bandera"].setValue("0");
      if (this.tipoUsuario.valid == true) {
        this.usuarioService.modificarTipoUsuario(this.tipoUsuario.value).subscribe(data => {
          this.usuarioService.listarTipoUsuarios().subscribe(res => { this.tipoUsuarios = res });
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Modificado con exito',
          showConfirmButton: false,
          timer: 3000
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `modificó un tipo de usuario.`).subscribe();
      }
    }
    this.tipoUsuario.controls["iidtipousuario"].setValue("0");
    this.tipoUsuario.controls["bandera"].setValue("0");
    this.tipoUsuario.controls["tipo"].setValue("");
    this.tipoUsuario.controls["descripcion"].setValue("");
    this.display = 'none';
    this.usuarioService.listarTipoUsuarios().subscribe(res => { this.tipoUsuarios = res });
  }

  eliminar(iidtipousuario) {
    Swal.fire({
      title: '¿Esta seguro de eliminar este registro?',
      text: "No podra revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminarTipoUsuario(iidtipousuario).subscribe(data => {
          Swal.fire(
            '¡ELIMINADO!',
            'El registro ha sido eliminado con exito.',
            'success'
          );
          this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Eliminó un tipo de usuario.`).subscribe();
          this.usuarioService.listarTipoUsuarios().subscribe(
            data => { this.tipoUsuarios = data }
          );
        });
      }
    })
  }

  buscar(buscador) {
    this.p = 1;
    this.usuarioService.buscarTipoUsuario(buscador.value).subscribe(res => { this.tipoUsuarios = res });
  }

  modificar(id) {
    this.titulo = "Modificar tipo usuario";
    this.display = 'block';
    this.usuarioService.RecuperarTipoUsuario(id).subscribe(data => {
    this.tipoUsuario.controls["iidtipousuario"].setValue(data.iidtipousuario);
    this.tipoUsuario.controls["tipo"].setValue(data.tipo);
    this.tipoUsuario.controls["descripcion"].setValue(data.descripcion);
    this.tipoUsuario.controls["bandera"].setValue("1");
    this.usuarioService.listarTipoUsuarios().subscribe(res => { this.tipoUsuarios = res });
    });
  }

  noRepetirTipoUsuario(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.usuarioService.validarTipoUsuario(this.tipoUsuario.controls["iidtipousuario"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              //retornamos
              resolve({ yaExiste: true });
            } else {
              //si todo esta bien
              resolve(null);
            }
          });
      }
    });
    return promesa;
  }
}
