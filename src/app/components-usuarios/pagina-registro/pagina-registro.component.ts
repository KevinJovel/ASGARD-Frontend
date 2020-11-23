import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pagina-registro',
  templateUrl: './pagina-registro.component.html',
  styleUrls: ['./pagina-registro.component.css']
})
export class PaginaRegistroComponent implements OnInit {
  usuario: FormGroup;
  usuarios: any;
 titulo: string = "";
 display = 'none';
 tipoUsuarios: any;
  empleados: any;
  constructor(private usuarioService: UsuarioService,
    private catalogoService: CatalogosService,) { 
      this.usuario = new FormGroup(
        {
          
          'iidusuario': new FormControl("0"),
          'bandera': new FormControl("0"),
          'nombreusuario': new FormControl("", [Validators.required, Validators.maxLength(50)], this.noRepetirUsuario.bind(this)),
          'contra': new FormControl("", [Validators.required, Validators.maxLength(30)]),
          'contra2': new FormControl("", [Validators.required, Validators.maxLength(30), this.validarContraIguales.bind(this)]),
          'iidEmpleado': new FormControl("", [Validators.required]),
          'iidTipousuario': new FormControl("")
        }
      );

    }

  ngOnInit(): void {
     //limpia cache
     this.titulo = "Formulario registro usuario";
     this.usuario.controls["iidusuario"].setValue("0");
     this.usuario.controls["bandera"].setValue("0");
     this.usuario.controls["nombreusuario"].setValue("");
     this.usuario.controls["contra"].setValue("");
     this.usuario.controls["contra2"].setValue("");
     this.usuario.controls["iidEmpleado"].setValue("");
     this.usuario.controls["iidTipousuario"].setValue("");
     this.display = 'block';
    this.usuarioService.listarEmpleadoCombo().subscribe(data => {
      this.empleados = data;
 
    });
     this.usuarioService.listarTipoCombo().subscribe(data => {
       this.tipoUsuarios = data;
     });
 
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
    this.usuario.controls["contra"].setValue("1");
    this.usuario.controls["contra2"].setValue("1");
    this.usuario.controls["iidEmpleado"].setValue("1");
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
      this.usuario.controls["iidTipousuario"].setValue(data.iidTipousuario);
      this.usuario.controls["bandera"].setValue("1");

      //se pone valor por defecto xq no se pueden editar estos campos
     //y para q permita habilitar el boton de guardar
    this.usuario.controls["contra"].setValue("1");
    this.usuario.controls["contra2"].setValue("1");
    this.usuario.controls["iidEmpleado"].setValue("1");

      this.usuarioService.getUsuario().subscribe(res => { this.usuarios = res });
    });
     
  }
  
  eliminar(idUsuario) {
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
        this.usuarioService.eliminarUsuario(idUsuario).subscribe(data => {
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
