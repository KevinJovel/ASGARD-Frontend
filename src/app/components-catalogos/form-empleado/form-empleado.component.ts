import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'form-empleado',
  templateUrl: './form-empleado.component.html',
  styleUrls: ['./form-empleado.component.css']
})
export class FormEmpleadoComponent implements OnInit {
  empleados: any;
  areas: any;
  cargos: any;
  p: number = 1;
  empleado: FormGroup;
  display = 'none';
  displayD = 'none';
  display3 = 'none';
  titulo: string;
  edit: number = 0;
  guardar: number = 0;
  tipocombo: string;

  //Datos
  duiE:string; nombresE:string; apellidosE:string; telefonoE:string;
  telefonoP:string; direccionE:string; AreaNegocioE:string; emailE:string; cargoE:string;
  sucursalE:string; ubicacionE:string;

  constructor(private catalogosServices: CatalogosService, private router: Router, private activateRoute: ActivatedRoute, private usuarioService: UsuarioService) {
    this.empleado = new FormGroup({
      'idempleado': new FormControl("0"),
      'bandera': new FormControl("0"),
      'dui': new FormControl("", [Validators.required], this.noRepetirDui.bind(this)),
      'nombres': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      'apellidos': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[-a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")]),
      'direccion': new FormControl("", [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ.´´,#° ]+$")]),
      'email': new FormControl("", [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      'telefono': new FormControl("", [Validators.required]),
      'telefonopersonal': new FormControl("", [Validators.required]),
      'idareadenegocio': new FormControl("0", [Validators.required]),
      'idcargo': new FormControl("0", [Validators.required]),
      'cargo': new FormControl(""),
      'idsucursal': new FormControl("")
    });
  }

  ngOnInit() {
    this.catalogosServices.getEmpleado().subscribe(data => {
      this.empleados = data;
    });
    this.catalogosServices.listarAreaCombo().subscribe(data => {
      this.areas = data;
    });
  }

  open() {
    //limpia cache
    this.titulo = "Formulario empleados";
    this.empleado.controls["idempleado"].setValue("0");
    this.empleado.controls["bandera"].setValue("0");
    this.empleado.controls["dui"].setValue("");
    this.empleado.controls["nombres"].setValue("");
    this.empleado.controls["apellidos"].setValue("");
    this.empleado.controls["direccion"].setValue("");
    this.empleado.controls["email"].setValue("");
    this.empleado.controls["telefono"].setValue("");
    this.empleado.controls["telefonopersonal"].setValue("");
    this.empleado.controls["idareadenegocio"].setValue("");
    this.empleado.controls["idcargo"].setValue("");
    this.display = 'block';
  }
  close() {
    this.display = 'none';
    this.edit = 0;
  }
  open3() { //para modal de ayuda
    this.display3 = 'block';
  }
  close2() { //para modal de ayuda
    this.display3 = "none";
  }

  openD() {
    this.displayD='block';
  }
  closeD() { //para modal de ayuda
    this.displayD = "none";
  }

  guardarDatos() {
    if ((this.empleado.controls["bandera"].value) == "0") {

      if (this.empleado.valid == true) {
        console.log(this.empleado.value);
        this.catalogosServices.guardarEmpleado(this.empleado.value).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Registro guardado con éxito!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó un empleado en el sistema.`).subscribe();
            this.catalogosServices.getEmpleado().subscribe(res => { this.empleados = res });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al guardar el registro!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó guardar un empleado en el sistema.`).subscribe();
          }
        });
      }
    } else {
      //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar
      this.empleado.controls["bandera"].setValue("0");
      if (this.empleado.valid == true) {
        this.catalogosServices.modificarEmpleado(this.empleado.value).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Registro modificado con éxito!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Modificó un empleado en el sistema.`).subscribe();
            this.catalogosServices.getEmpleado().subscribe(res => { this.empleados = res });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al modificar el registro!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó modificar un empleado en el sistema.`).subscribe();
          }
        });
      }
    }
    this.empleado.controls["idempleado"].setValue("0");
    this.empleado.controls["bandera"].setValue("0");
    this.empleado.controls["dui"].setValue("");
    this.empleado.controls["nombres"].setValue("");
    this.empleado.controls["apellidos"].setValue("");
    this.empleado.controls["direccion"].setValue("");
    this.empleado.controls["telefono"].setValue("");
    this.empleado.controls["telefonopersonal"].setValue("");
    this.empleado.controls["idareadenegocio"].setValue("");
    this.empleado.controls["idcargo"].setValue("");
    this.edit = 0;
    this.display = 'none';
  }

  verDetalle(id: any) {
    this.displayD = 'block';
    this.catalogosServices.VerDatosEmpleado(id).subscribe((data) => {
     
      //Datos
      this.duiE=data.dui;
      this.nombresE=data.nombres;
      this.apellidosE=data.apellidos;
      this.direccionE=data.direccion;
      this.telefonoE=data.telefono;
      this.telefonoP=data.telefonopersonal;
      this.cargoE=data.cargo;
      this.emailE=data.email;
      this.AreaNegocioE=data.nombrearea;
      this.sucursalE=data.nombresucursal;
      this.ubicacionE=data.ubicacion;

    });
  }

  filtrarCargo() {
    var idArea = this.empleado.controls['idareadenegocio'].value;
    this.catalogosServices.ValidarAreaJefe(idArea).subscribe(data => {
      if (data == 1) {
        this.catalogosServices.listarCargoCombosinJ().subscribe(data => { this.cargos = data });
      } else {
        this.catalogosServices.listarCargoCombo().subscribe(data => { this.cargos = data });
      }
    });

  }

  modif(id) {
    this.catalogosServices.noModificarArea(id).subscribe(data => {
      if (data == 1) {
        this.edit = 1;
      }
      this.titulo = "Modificar empleado";
      this.display = 'block';
      this.catalogosServices.RecuperarEmpleado(id).subscribe(data => {
        this.empleado.controls["idempleado"].setValue(data.idempleado);
        this.empleado.controls["dui"].setValue(data.dui);
        this.empleado.controls["nombres"].setValue(data.nombres);
        this.empleado.controls["apellidos"].setValue(data.apellidos);
        this.empleado.controls["direccion"].setValue(data.direccion);
        this.empleado.controls["email"].setValue(data.email);
        this.empleado.controls["telefono"].setValue(data.telefono);
        this.empleado.controls["telefonopersonal"].setValue(data.telefonopersonal);
        this.empleado.controls["idareadenegocio"].setValue(data.idareadenegocio);

        var isJefe = this.empleado.controls['idareadenegocio'].setValue(data.idareadenegocio);
        this.catalogosServices.ValidarAreaJefe(isJefe).subscribe(res => {
      if (res == 1) {
        this.catalogosServices.listarCargoCombosinJ().subscribe(res => { 
          this.cargos = res 
        });
        this.empleado.controls["idcargo"].setValue(data.idcargo);
      } else {
        this.catalogosServices.listarCargoCombo().subscribe(res => { 
          this.cargos = res 
        });
        this.empleado.controls["idcargo"].setValue(data.idcargo);
      }
    });
        this.empleado.controls["bandera"].setValue("1");
        this.catalogosServices.getEmpleado().subscribe(res => { this.empleados = res });
      });
    });
  }
  eliminar(idempleado) {
    this.catalogosServices.noEliminarEmpleado(idempleado).subscribe(data => {
      if (data == 1) {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: 'No es posible eliminar este registro, ya existen activos denominados a este empleado',
          confirmButtonText: 'Aceptar'
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó eliminar un empleado en el sistema.`).subscribe();
      } else {
        Swal.fire({
          title: '¿Estás seguro de eliminar este registro?',
          text: "¡No podrás revertir esta acción!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Si, eliminar!',
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.value) {
            this.catalogosServices.eliminarEmpleado(idempleado).subscribe(data => {
              if (data == 1) {
                Swal.fire({
                  icon: 'success',
                  title: '¡ELIMINADO!',
                  text: '¡El registro ha sido eliminado con éxito!',
                  confirmButtonText: 'Aceptar'
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Eliminó un empleado en el sistema.`).subscribe();
                this.catalogosServices.getEmpleado().subscribe(data => { this.empleados = data });
              } else {
                Swal.fire({
                  icon: 'error',
                  title: '¡Error!',
                  text: '¡Ocurrió un error al eliminar el registro!',
                  confirmButtonText: 'Aceptar'
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó eliminar un empleado en el sistema.`).subscribe();
              }
            });
          }
        })
      }
    })
  }

  buscar(buscador) {
    this.p = 1;
    this.catalogosServices.buscarEmpleado(buscador.value).subscribe(res => { this.empleados = res });
  }

  noRepetirDui(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.catalogosServices.validardui(this.empleado.controls["idempleado"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteDui: true });
            } else {
              resolve(null);
            }
          });
      }
    });
    return promesa;
  }
}
