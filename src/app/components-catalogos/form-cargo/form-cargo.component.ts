import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-cargo',
  templateUrl: './form-cargo.component.html',
  styleUrls: ['./form-cargo.component.css']
})
export class FormCargoComponent implements OnInit {

  //Variables  
  cargos: any;
  cargo: FormGroup;
  titulo: string;
  display = 'none';
  display3 = 'none';
  p: number = 1;

  constructor(private catalogoService: CatalogosService, private usuarioService: UsuarioService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.cargo = new FormGroup({
      'idcargo': new FormControl("0"),
      'bandera': new FormControl("0"),
      'cargo': new FormControl("", [Validators.required, Validators.maxLength(25), Validators.pattern("^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]+$")], this.noRepetirCargo.bind(this)),
      'descripcion': new FormControl("", [Validators.maxLength(50), Validators.pattern("^[a-zA-Z 0-9ÑñáéíóúÁÉÍÓÚ.]+$")])
    });
  }

  ngOnInit() {
    this.catalogoService.getCargo().subscribe(data => { this.cargos = data });

  }

  //Métodos   

  open() {
    //limpia cache  
    this.titulo = "Formulario cargo";
    this.cargo.controls["idcargo"].setValue("0");
    this.cargo.controls["bandera"].setValue("0");
    this.cargo.controls["cargo"].setValue("");
    this.cargo.controls["descripcion"].setValue("");
    this.display = 'block';
  }
  close() {
    this.display = 'none';
  }

  open3() {  //para modal de ayuda 
    this.display3 = 'block';
  }
  close2() { //para modal de ayuda
    this.display3 = "none";
  }

  guardarDatos() {
    if ((this.cargo.controls["bandera"].value) == "0") {
      if (this.cargo.valid == true) {
        this.catalogoService.agregarCargo(this.cargo.value).subscribe(data => {
          if (data == 1) {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Registro guardado con éxito!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Guardó un cargo en el sistema.`).subscribe();
            this.catalogoService.getCargo().subscribe(data => { this.cargos = data });
          } else {
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al guardar el registro!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Intentó guardar un cargo en el sistema.`).subscribe();
          }

        });
      }
    } else {
      //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar   

      this.cargo.controls["bandera"].setValue("0");
      if (this.cargo.valid == true) {
        this.catalogoService.updateCargo(this.cargo.value).subscribe(data => {
          if(data==1){
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: '¡Registro modificado con éxito!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Modificó un cargo en el sistema.`).subscribe();
            this.catalogoService.getCargo().subscribe(data => { this.cargos = data });
          }else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: '¡Ocurrió un error al modificar el registro!',
              showConfirmButton: false,
              timer: 3000
            });
            this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Intentó modificar un cargo en el sistema.`).subscribe();
          }    
        });
      }
    }
    this.cargo.controls["idcargo"].setValue("0");
    this.cargo.controls["bandera"].setValue("0");
    this.cargo.controls["cargo"].setValue("");
    this.cargo.controls["descripcion"].setValue("");
    this.display = 'none';
    this.catalogoService.getCargo().subscribe(data => { this.cargos = data });
  }

  modif(id) {
    this.titulo = "Modificar cargo";
    this.display = 'block';
    this.catalogoService.recuperarCargo(id).subscribe(data => {
      this.cargo.controls["idcargo"].setValue(data.idcargo);
      this.cargo.controls["bandera"].setValue("1");
      this.cargo.controls["cargo"].setValue(data.cargo);
      this.cargo.controls["descripcion"].setValue(data.descripcion);
      this.catalogoService.getCargo().subscribe(data => { this.cargos = data });
    });
  }

  eliminar(idcargo) {
    this.catalogoService.existenCargosAsignados(idcargo).subscribe(data => {
      if (data == 1) {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'No es posible eliminar este registro, este cargo ya lo tiene asignado un empleado',
          confirmButtonText: 'Aceptar'
        });
        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Intentó eliminar un cargo en el sistema.`).subscribe();
      } else {
        Swal.fire({
          title: '¿Estás seguro de eliminar este registro?',
          text: "¡No podrás revertir esta acción!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '¡Si, eliminar!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.value) {
            this.catalogoService.eliminarCargo(idcargo).subscribe(data => {
              if(data==1){
                Swal.fire({
                  icon: 'success',
                  title: '¡ELIMINADO!',
                  text: '¡El registro ha sido eliminado con éxito!',
                  confirmButtonText: 'Aceptar'
  
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Eliminó una cargo en el sistema.`).subscribe();
                this.catalogoService.getCargo().subscribe(res => { this.cargos = res });
              }else{
                Swal.fire({
                  icon: 'error',
                  title: '¡Error!',
                  text: '¡Ocurrió un error al eliminar el registro!',
                  confirmButtonText: 'Aceptar'
  
              });
              this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")),`Intentó eliminar un cargo en el sistema.`).subscribe();
              }
              
            });
          }
        })
      }
    })
  }

  buscar(buscador) {
    this.p = 1;
    this.catalogoService.buscarCargo(buscador.value).subscribe(res => this.cargos = res);
  }

  noRepetirCargo(control: FormControl) {
    var promesa = new Promise((resolve, reject) => {
      if (control.value != "" && control.value != null) {
        this.catalogoService.validarCargo(this.cargo.controls["idcargo"].value, control.value)
          .subscribe(data => {
            if (data == 1) {
              resolve({ yaExisteCargo: true });
            } else {
              resolve(null);
            }
          })
      }
    });
    return promesa;
  }

}
