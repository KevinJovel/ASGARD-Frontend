import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'form-clasificacion',
  templateUrl: './form-clasificacion.component.html',
  styleUrls: ['./form-clasificacion.component.css']
})
export class FormClasificacionComponent implements OnInit {
  clasificaciones: any;
  categorias: any;
  p: number = 1;
  clasificacion: FormGroup;
  display = 'none';
  display3 = 'none';
  titulo: string;
  edit: number = 0;
  constructor(private catalogosServices: CatalogosService, private router: Router, private activateRoute: ActivatedRoute, private usuarioService: UsuarioService) {
    this.clasificacion = new FormGroup({
      'idclasificacion': new FormControl("0"),
      'bandera': new FormControl("0"),
      'clasificacion': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[-a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")], this.noRepetirClasificacion.bind(this)),
      'correlativo': new FormControl("", [Validators.required, Validators.maxLength(5), Validators.pattern("^[0-9-a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")], this.noRepetirCorrelativo.bind(this)),
      'descripcion': new FormControl("", [Validators.maxLength(100), Validators.pattern("^[a-zA-Z 0-9-ñÑ@.,#+?¿¡''!áéíóúÁÉÍÓÚ ]+$")]),
      'idcategoria': new FormControl("", [Validators.required])
    });
  }

  ngOnInit() {
    this.catalogosServices.getClasificacion().subscribe(data => { this.clasificaciones = data });
    this.catalogosServices.listarCategoriaCombo().subscribe(data => { this.categorias = data });
  }

  open() {
    //limpia cache
    this.titulo = "Formulario clasificación";
    this.clasificacion.controls["idclasificacion"].setValue("0");
    this.clasificacion.controls["bandera"].setValue("0");
    this.clasificacion.controls["clasificacion"].setValue("");
    this.clasificacion.controls["correlativo"].setValue("");
    this.clasificacion.controls["idcategoria"].setValue("");
    this.clasificacion.controls["descripcion"].setValue("");
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

  guardarDatos() {
    console.log(this.clasificacion.value);
    if ((this.clasificacion.controls["bandera"].value) == "0") {
      if (this.clasificacion.valid == true) {
        this.catalogosServices.guardarClasificacion(this.clasificacion.value).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Registro guardado con éxito!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó una clasificación en el sistema.`).subscribe();
            this.catalogosServices.getClasificacion().subscribe(res => { this.clasificaciones = res });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al guardar el registro!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó guardar una clasificación en el sistema.`).subscribe();
          }
        });
      }
    } else {
      //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar
      this.clasificacion.controls["bandera"].setValue("0");
      if (this.clasificacion.valid == true) {
        this.catalogosServices.modificarclasificacion(this.clasificacion.value).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Registro modificado con éxito!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Modificó una clasificación en el sistema.`).subscribe();
            this.catalogosServices.getClasificacion().subscribe(res => { this.clasificaciones = res });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al modificar el registro!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó modificar una clasificación en el sistema.`).subscribe();
          }
        });
      }
    }
    this.clasificacion.controls["idclasificacion"].setValue("0");
    this.clasificacion.controls["bandera"].setValue("0");
    this.clasificacion.controls["clasificacion"].setValue("");
    this.clasificacion.controls["correlativo"].setValue("");
    this.clasificacion.controls["idcategoria"].setValue("");
    this.clasificacion.controls["descripcion"].setValue("");
    this.edit = 0;
    this.display = 'none';
  }

  modif(id) {
    this.catalogosServices.noEditCorrelativoClasificacion(id).subscribe(data => {
      if (data == 1) {
        this.edit = 1;
      }
      this.titulo = "Modificar clasificación";
      this.display = 'block';
      this.catalogosServices.RecuperarClasificacion(id).subscribe(data => {
        this.clasificacion.controls["idclasificacion"].setValue(data.idclasificacion);
        this.clasificacion.controls["clasificacion"].setValue(data.clasificacion);
        this.clasificacion.controls["correlativo"].setValue(data.correlativo);
        this.clasificacion.controls["idcategoria"].setValue(data.idcategoria);
        this.clasificacion.controls["descripcion"].setValue(data.descripcion);
        this.clasificacion.controls["bandera"].setValue("1");
        this.catalogosServices.getClasificacion().subscribe(res => { this.clasificaciones = res });
      });
    });
  }
  eliminar(idclasificacion) {
    this.catalogosServices.validarActivo(idclasificacion).subscribe(data => {
      if (data == 1) {
        Swal.fire({
          icon: 'error',
          title: '¡ERROR!',
          text: 'No es posible eliminar este dato, ya existen activos denominados a esta clasificación',
          confirmButtonText: 'Aceptar'
        })
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó eliminar una clasificación en el sistema.`).subscribe();
      } else {
        Swal.fire({
          title: '¿Estas seguro de eliminar este registro?',
          text: "¡No podrás revertir esta acción!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Si, eliminar!',
          cancelButtonText: "Cancelar"
        }).then((result) => {
          if (result.value) {
            this.catalogosServices.eliminarCasificacion(idclasificacion).subscribe(data => {
              if (data == 1) {
                Swal.fire({
                  icon: 'success',
                  title: '¡ELIMINADO!',
                  text: '¡El registro ha sido eliminado con éxito!',
                  confirmButtonText: 'Aceptar'
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Eliminó una clasificación en el sistema.`).subscribe();
                this.catalogosServices.getClasificacion().subscribe(data => { this.clasificaciones = data });
              } else {
                Swal.fire({
                  icon: 'success',
                  title: '¡Error!',
                  text: '¡Ocurrió un error al eliminar el registro!',
                  confirmButtonText: 'Aceptar'
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó eliminar una clasificación en el sistema.`).subscribe();
              }
            });
          }
        })
      }
    })
  }
  buscar(buscador) {
    this.p = 1;
    this.catalogosServices.buscarClasificacion(buscador.value).subscribe(res => { this.clasificaciones = res });
  }
  noRepetirCorrelativo(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.catalogosServices.validarCorrelativo(this.clasificacion.controls["idclasificacion"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteCorrelativo: true });
            } else {
              resolve(null);
            }
          })
      }
    });

    return promesa;
  }
  noRepetirClasificacion(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.catalogosServices.validarClasificacion(this.clasificacion.controls["idclasificacion"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteClasificacion: true });
            } else {
              resolve(null);
            }
          })
      }
    });
    return promesa;
  }
}
