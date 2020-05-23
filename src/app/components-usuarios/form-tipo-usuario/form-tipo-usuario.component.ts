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
      "tipo": new FormControl("", [Validators.required, Validators.maxLength(50)]),
      "descripcion": new FormControl("", [Validators.required, Validators.maxLength(100)]),
      //creamos una variable opcional
      //"valores": new FormControl("")
    });

  }
  ngOnInit() { 
    this.usuarioService.listarTipoUsuarios().subscribe(res => { this.tipoUsuarios = res });
  }

  open() {
    //limpia cache
    this.titulo = "Formulario registro Tipo Usuario";
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
        })
      }
    }
    else {
      //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar

      this.tipoUsuario.controls["bandera"].setValue("0");
      if (this.tipoUsuario.valid == true) {
        this.usuarioService.ActualizarTipoUsuario(this.tipoUsuario.value).subscribe(data => {
          this.usuarioService.listarTipoUsuarios().subscribe(res => { this.tipoUsuarios = res });
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Modificado con exito',
          showConfirmButton: false,
          timer: 3000
        })
      }
    }

    this.tipoUsuario.controls["iidtipousuario"].setValue("0");
    this.tipoUsuario.controls["bandera"].setValue("0");
    this.tipoUsuario.controls["tipo"].setValue("");
    this.tipoUsuario.controls["descripcion"].setValue(""); 

    this.display = 'none';
    this.usuarioService.listarTipoUsuarios().subscribe(res => { this.tipoUsuarios = res });

  }

  modificar(id) {

    this.titulo = "Modificar Tipo Usuario";
    this.display = 'block';
    this.usuarioService.recuperarTipoUsuario(id).subscribe(data => {

      this.tipoUsuario.controls["iidtipousuario"].setValue(data.iidtipousuario);
      this.tipoUsuario.controls["tipo"].setValue(data.tipo);
      this.tipoUsuario.controls["descripcion"].setValue(data.descripcion);
      this.tipoUsuario.controls["bandera"].setValue("1");

      this.usuarioService.listarTipoUsuarios().subscribe(res => { this.tipoUsuarios = res });
    });
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
            'Dato eliminado!',
            'El registro ha sido eliminado con exito.',
            'success'
          )
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
}
