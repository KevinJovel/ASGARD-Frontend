import { Component, OnInit } from '@angular/core';
//importamos
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from './../../services/usuario.service';
import { CatalogosService } from './../../services/catalogos.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.css']
})
export class FormUsuarioComponent implements OnInit {

  usuario: FormGroup;
  usuarios: any;
  titulo: string = "";
  display = 'none';
  displayU = 'none';
  display2 = 'none';
  display3 = 'none';
  p: number = 1;
  tipoUsuarios: any;
  empleados: any;
  editar: boolean;
  //variables para modal de ver detalles de usuarios
  nombreEmpleado: string;
  nombreusuario: string;
  tipoUsuario: string;
  sucursal: string;
  areanegocio: string;

  constructor(private activatedRoute: ActivatedRoute, private usuarioService: UsuarioService,
    private catalogoService: CatalogosService,
    private router: Router) {

    this.usuario = new FormGroup(
      {
        'iidusuario': new FormControl("0"),
        'bandera': new FormControl("0"),
        'nombreusuario': new FormControl("", [Validators.required, Validators.maxLength(50)], this.noRepetirUsuario.bind(this)),
        'contra': new FormControl("", [Validators.required, Validators.maxLength(30)]),
        'contra2': new FormControl("", [Validators.required, Validators.maxLength(30), this.validarContraIguales.bind(this)]),
        'iidEmpleado': new FormControl("", [Validators.required]),
        'iidTipousuario': new FormControl("", [Validators.required])
      }
    );
  }

  ngOnInit() {
    this.usuarioService.getUsuario().subscribe(data => {
      this.usuarios = data;
    });
    this.usuarioService.listarEmpleadoCombo().subscribe(data => {
      this.empleados = data;
    });
    this.usuarioService.listarTipoCombo().subscribe(data => {
      this.tipoUsuarios = data;
    });
  }

  open() {
    this.usuarioService.listarEmpleadoCombo().subscribe(data => {
      this.empleados = data;
    });
    this.titulo = "Formulario registro usuario";
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
    this.editar = false;
  }
  close2() {
    this.display2 = 'none';
  }
  close3() {
    this.display3 = 'none';
  }

  guardarDatos() {
    if ((this.usuario.controls["bandera"].value) == "0") {
      let tipo = this.usuario.controls["iidTipousuario"].value;
      // console.log(this.usuario.value)
      this.catalogoService.EsEmpleadoJefe(this.usuario.controls["iidEmpleado"].value).subscribe(res => {
        if (tipo == 2 && res != 1) {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'El empleado seleccionado no puede ser usuario jefe',
            showConfirmButton: false,
            timer: 3000
          });
          this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó guardar un usuario tipo jefe de área.`).subscribe();
        } else {
          console.log(this.usuario.value);
          this.usuarioService.agregarUsuario(this.usuario.value).subscribe(data => {
            if (data == 1) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuario guardado con éxito',
                showConfirmButton: false,
                timer: 3000
              });
              this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó un usuario tipo jefe de área.`).subscribe();
              this.limpiar();
              this.display = 'none';
              this.display2 = 'none';
              this.usuarioService.getUsuario().subscribe(res => { this.usuarios = res });
            } else {
              alert("Ocurrió un error")
            }
          });
        }
      });
    } else {
      //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar
      this.usuario.controls["bandera"].setValue("0");
      if (this.usuario.valid == true) {
        this.usuarioService.ActualizarUsuario(this.usuario.value).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro modificado con éxito',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Modificó un usuario.`).subscribe();
            this.limpiar();
            this.display = 'none';
            this.usuarioService.getUsuario().subscribe(res => { this.usuarios = res });
            this.editar = false;
          } else {
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó modificar un usuario.`).subscribe();
          }
        });
      }
    }
  }
  limpiar() {
    this.usuario.controls["iidusuario"].setValue("0");
    this.usuario.controls["bandera"].setValue("0");
    this.usuario.controls["nombreusuario"].setValue("");
    this.usuario.controls["contra"].setValue("1");
    this.usuario.controls["contra2"].setValue("1");
    this.usuario.controls["iidEmpleado"].setValue("1");
    this.usuario.controls["iidTipousuario"].setValue("");
  }
  modificar(id) {
    if (sessionStorage.getItem("idUser") == id) {
      this.editar = true;
    } else {
      this.editar = false;
    }
    this.titulo = "Modificar usuario";
    this.display = 'block';
    this.usuarioService.recuperarUsuario(id).subscribe(data => {
      this.usuario.controls["iidusuario"].setValue(data.iidusuario);
      this.usuario.controls["nombreusuario"].setValue(data.nombreusuario);
      this.usuario.controls["iidTipousuario"].setValue(data.iidTipousuario);
      this.usuario.controls["bandera"].setValue("1");
      this.usuario.controls["contra"].setValue("1");
      this.usuario.controls["contra2"].setValue("1");
      this.usuario.controls["iidEmpleado"].setValue("1");
      this.usuarioService.getUsuario().subscribe(res => { this.usuarios = res });
    });
  }

  eliminar(idUsuario) {
    if (sessionStorage.getItem("idUser") == idUsuario) {
      Swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'No puede eliminar al usuario con el que se ha logueado',
        showConfirmButton: false,
        timer: 3000
      });
      this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó eliminar un usuario del sistema.`).subscribe();
    } else {
      Swal.fire({
        title: '¿Esta seguro de eliminar este registro?',
        text: "No podra revertir esta accion!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.value) {
          this.usuarioService.eliminarUsuario(idUsuario).subscribe(data => {
            if (data == 1) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuario eliminado con éxito',
                showConfirmButton: false,
                timer: 3000
              });
              this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Eliminó un usuario del sistema.`).subscribe();
              this.usuarioService.getUsuario().subscribe(data => { this.usuarios = data });
            }
          });
        }
      });
    }
  }
  ver(id) {
    this.usuarioService.recuperarDetallesUsuario(id).subscribe(data => {
      this.nombreEmpleado = data.nombre;
      this.nombreusuario = data.nombreusuario;
      this.tipoUsuario = data.tipousuario;
      this.sucursal = data.sucursal;
      this.areanegocio = data.area;
      this.display3 = 'block';
    });
    this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Consultó la información de un usuario.`).subscribe();
  }
  OpenAsignarAsistente(id) {
    this.usuarioService.validarEmpleadoComboAsistente(id).subscribe(res => {
      if (res == 1) {
        this.usuarioService.listarEmpleadoComboAsistente(id).subscribe(data => {
          this.empleados = data;
        });
        this.titulo = "Asignar empleado asistente";
        this.usuario.controls["iidTipousuario"].setValue(3);
        this.display2 = 'block';

      } else {
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'No hay empleados disponibles para asistente',
          showConfirmButton: false,
          timer: 3000
        });
      }

    });
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
