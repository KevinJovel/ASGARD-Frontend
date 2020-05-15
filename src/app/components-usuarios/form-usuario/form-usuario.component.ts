import { Component, OnInit, Input } from '@angular/core';
//importamos
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { CatalogosService } from './../../services/catalogos.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  usuario: FormGroup;
  @Input() usuarios: any;
  titulo: string = "";
  display = 'none';
  p: number = 1;
  tipoUsuarios: any;
  empleados: any;
  //variable para el formulario dinamico
  //ver: boolean = true;

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService,
    private catalogoService: CatalogosService,
    private router: Router) {

    this.usuario = new FormGroup(
      {
        
        'iidusuario': new FormControl("0"),
        'bandera': new FormControl("0"),
        'nombreusuario': new FormControl("", [Validators.required, Validators.maxLength(50), this.noRepetirUsuario.bind(this)]),
        'contra': new FormControl("", [Validators.required, Validators.maxLength(30)]),
        'contra2': new FormControl("", [Validators.required, Validators.maxLength(30), this.validarContraIguales.bind(this)]),
        'iidEmpleado': new FormControl("", [Validators.required]),
        'iidTipousuario': new FormControl("", [Validators.required])
      }
    );
  }

  ngOnInit() {
    //this.usuarioService.getUsuario().subscribe(res => { this.usuarios = res });
  }

  open() {
    //limpia cache
    this.titulo = "Formulario registro de Usuario";
    this.usuario.controls["iidusuario"].setValue("0");
    this.usuario.controls["bandera"].setValue("0");
    this.usuario.controls["nombreusuario"].setValue("");
    this.usuario.controls["contra"].setValue("");
    this.usuario.controls["contra2"].setValue("");
    this.usuario.controls["iidEmpleado"].setValue("");
    this.usuario.controls["iidTipousuario"].setValue("");
    this.display = 'block';

  }

  close() {
    this.display = 'none';
  }

  guardarDatos() {
    if ((this.usuario.controls["bandera"].value) == "0") {
      if (this.usuario.valid == true) {
        this.usuarioService.agregarUsuario(this.usuario.value).subscribe(data => {
          this.usuarioService.getUsuario().subscribe(res => { this.usuarios = res });
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

      this.usuario.controls["bandera"].setValue("0");
      if (this.usuario.valid == true) {
       this.usuarioService.ActualizarUsuario(this.usuario.value).subscribe(data => {
          this.usuarioService.getUsuario().subscribe(res => { this.usuarios = res });
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
    
    this.usuario.controls["iidusuario"].setValue("0");
    this.usuario.controls["bandera"].setValue("0");
    this.usuario.controls["nombreusuario"].setValue("");
    this.usuario.controls["contra"].setValue("");
    this.usuario.controls["contra2"].setValue("");
    this.usuario.controls["iidEmpleado"].setValue("");
    this.usuario.controls["iidTipousuario"].setValue("");

    this.display = 'none';
    this.usuarioService.getUsuario().subscribe(res => { this.usuarios = res });

  }


  modificar(id) {

    this.titulo = "Modificar Usuario";
    this.display = 'block';
    this.usuarioService.recuperarUsuario(id).subscribe(data => {
      this.usuario.controls["iidusuario"].setValue(data.iidusuario);
      this.usuario.controls["nombreusuario"].setValue(data.nombreusuario);
      this.usuario.controls["contra"].setValue(data.contra);
      this.usuario.controls["contra2"].setValue(data.contra2);
      this.usuario.controls["iidEmpleado"].setValue(data.iidEmpleado);
      this.usuario.controls["iidTipousuario"].setValue(data.iidTipousuario);
      this.usuario.controls["bandera"].setValue("1");

      this.usuarioService.getUsuario().subscribe(res => { this.usuarios = res });
    });
  }


  eliminar(iidusuario) {
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
        this.usuarioService.eliminarUsuario(iidusuario).subscribe(data => {
          Swal.fire(
            'Dato eliminado!',
            'El registro ha sido eliminado con exito.',
            'success'
          )
          this.usuarioService.getUsuario().subscribe(
            data => { this.usuarios = data }
          );
        });

      }
    })
  }


  buscar(buscador) {
    this.p = 1;
    this.usuarioService.buscarUsuario(buscador.value).subscribe(res => { this.usuarios = res });
  }

  noRepetirUsuario(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.usuarioService.validarUsuario(this.usuario.controls["iidusuario"].value, control.value)
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

  validarContraIguales(control: FormControl) {
    //con value sacamos el valor del control
    if (control.value != "" && control.value != null) {
      if (this.usuario.controls["contra"].value != control.value) {
        //si es diferente mandamos error devolviendo un objeto
        return { noIguales: true };
      } else {
        //todo esta bien
        return null;
      }
    }
  }

}
