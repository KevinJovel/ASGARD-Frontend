import { Component, Input, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-proveedor',
  templateUrl: './form-proveedor.component.html',
  styleUrls: ['./form-proveedor.component.css']
})
export class FormProveedorComponent implements OnInit {

  proveedores: FormGroup;
  @Input() proveedor: any;
  display = 'none';
  display3 = 'none';
  titulo: string;
  //parametro: string;
  p: number = 1;
  constructor(private catalogoService: CatalogosService, private usuarioService: UsuarioService) {

    this.proveedores = new FormGroup({
      'idProveedor': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ]+$")], this.noRepetirProveedor.bind(this)),
      'telefono': new FormControl("", [Validators.required, Validators.maxLength(9), this.validarIguales.bind(this)], this.noRepetirTelProveedor.bind(this)),
      'direccion': new FormControl("", [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-z A-Z 0-9 ñÑáÁéÉíÍóÓúÚ #.°]+$")]),
      'rubro': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z A-Z  ñÑáÁéÉíÍóÓúÚ]+$")]),
      'encargado': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ]+$")], this.noRepetirEncargado.bind(this)),
      'telefonoencargado': new FormControl("", [Validators.required, Validators.maxLength(9), this.validarContraIguales.bind(this)], this.noRepetirTelEncargado.bind(this))
    });
  }

  ngOnInit() {
    this.catalogoService.getProveedores().subscribe(res => { this.proveedor = res });
  }

  open() {
    //limpia cache
    this.titulo = "Formulario proveedores";
    this.proveedores.controls["idProveedor"].setValue("0");
    this.proveedores.controls["bandera"].setValue("0");
    this.proveedores.controls["nombre"].setValue("");
    this.proveedores.controls["telefono"].setValue("");
    this.proveedores.controls["direccion"].setValue("");
    this.proveedores.controls["rubro"].setValue("");
    this.proveedores.controls["encargado"].setValue("");
    this.proveedores.controls["telefonoencargado"].setValue("");
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
    if ((this.proveedores.controls["bandera"].value) == "0") {
      if (this.proveedores.valid == true) {
        this.catalogoService.agregarProveedor(this.proveedores.value).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro guardado con éxito',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó un proveedor en el sistema.`).subscribe();
            this.catalogoService.getProveedores().subscribe(res => { this.proveedor = res });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al guardar el registro!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó guardar un proveedor en el sistema.`).subscribe();
          }
        });
      }
    }
    else {
      this.proveedores.controls["bandera"].setValue("0");
      if (this.proveedores.valid == true) {
        this.catalogoService.ActualizarProveedor(this.proveedores.value).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Registro modificado con éxito',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Modificó un proveedor en el sistema.`).subscribe();
            this.catalogoService.getProveedores().subscribe(res => { this.proveedor = res });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al modificar el registro!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó modificar un proveedor en el sistema.`).subscribe();
          }
        });
      }
    }
    this.proveedores.controls["idProveedor"].setValue("0");
    this.proveedores.controls["bandera"].setValue("0");
    this.proveedores.controls["nombre"].setValue("");
    this.proveedores.controls["telefono"].setValue("");
    this.proveedores.controls["direccion"].setValue("");
    this.proveedores.controls["rubro"].setValue("");
    this.proveedores.controls["encargado"].setValue("");
    this.proveedores.controls["telefonoencargado"].setValue("");
    this.display = 'none';
  }

  modificar(id) {

    this.titulo = "Modificar proveedor";
    this.display = 'block';
    this.catalogoService.recuperarProveedores(id).subscribe(data => {
      this.proveedores.controls["idProveedor"].setValue(data.idProveedor);
      this.proveedores.controls["nombre"].setValue(data.nombre);
      this.proveedores.controls["telefono"].setValue(data.telefono);
      this.proveedores.controls["direccion"].setValue(data.direccion);
      this.proveedores.controls["rubro"].setValue(data.rubro);
      this.proveedores.controls["encargado"].setValue(data.encargado);
      this.proveedores.controls["telefonoencargado"].setValue(data.telefonoencargado);
      this.proveedores.controls["bandera"].setValue("1");

      this.catalogoService.getProveedores().subscribe(res => { this.proveedor = res });
    });
  }
  eliminar(idProveedor) {
    this.catalogoService.validarDependeActivo(idProveedor).subscribe(data => {
      if (data == 1) {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'No es posible eliminar este registro, este proveedor ya tiene activos registrados',
          confirmButtonText: 'Aceptar'
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó eliminar un proveedor en el sistema.`).subscribe();
      } else {
        Swal.fire({
          title: '¿Estás seguro de eliminar este registro?',
          text: "¡No podrás revertir esta acción!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
          if (result.value) {
            this.catalogoService.eliminarProveedor(idProveedor).subscribe(data => {
              if(data==1){
                Swal.fire({
                  icon: 'success',
                  title: '¡ELIMINADO!',
                  text: 'El registro ha sido eliminado con éxito.',
                  confirmButtonText: 'Aceptar'
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Eliminó un proveedor en el sistema.`).subscribe();
                this.catalogoService.getProveedores().subscribe(data => { this.proveedor = data });
              }else{
                Swal.fire({
                  icon: 'error',
                  title: '¡Error!',
                  text: '¡Ocurrió un error al eliminar el registro!',
                  confirmButtonText: 'Aceptar'
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó eliminar un proveedor en el sistema.`).subscribe();
              }
            });
          }
        })
      }
    })
  }
  //Método

  buscar(buscador) {
    this.p = 1;
    this.catalogoService.buscarProveedor(buscador.value).subscribe(res => { this.proveedor = res });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////
  noRepetirProveedor(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.catalogoService.validarProveedor(this.proveedores.controls["idProveedor"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteProveedor: true });
            } else {
              resolve(null);
            }
          });
      }
    });
    return promesa;
  }
  noRepetirEncargado(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.catalogoService.validarEncargado(this.proveedores.controls["idProveedor"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteEncargado: true });
            } else {
              resolve(null);
            }
          });
      }
    });

    return promesa;
  }

  noRepetirTelProveedor(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.catalogoService.validarTelProveedor(this.proveedores.controls["idProveedor"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteTelProveedor: true });
            } else {
              resolve(null);
            }
          });
      }
    });

    return promesa;
  }

  noRepetirTelEncargado(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.catalogoService.validarTelEncargado(this.proveedores.controls["idProveedor"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteTelEncargado: true });
            } else {
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
      var aux: String = "";
      aux = control.value;
      if (aux.length == 9) {
        //console.log(control.value);
        if ((this.proveedores.controls["telefono"].value != aux)) {
          return null;
        } else {
          //todo esta bien
          return { noIguales: true };
        }
      }
    }
  }

  validarIguales(control: FormControl) {
    //con value sacamos el valor del control
    if (control.value != "" && control.value != null) {
      var aux: String = "";
      aux = control.value;
      if (aux.length == 9) {
        console.log(control.value);
        //si es diferente mandamos error devolviendo un objeto
        if ((this.proveedores.controls["telefonoencargado"].value != aux)) {
          return null;
        } else {
          //todo esta bien
          return { Iguales: true };
        }
      }
    }
  }
}

