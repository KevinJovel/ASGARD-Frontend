import { Component, OnInit } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { UsuarioService } from './../../services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-form-sucursal',
    templateUrl: './form-sucursal.component.html',
    styleUrls: ['./form-sucursal.component.css']
})
export class FormSucursalComponent implements OnInit {
    sucursales: any;
    p: number = 1;
    sucursal: FormGroup;
    display = 'none';
    display3 = 'none';
    titulo: string;
    modif: number = 0;
    yaExiste: boolean = false;
    constructor(private catalogoService: CatalogosService, private usuarioService: UsuarioService) {
        this.sucursal = new FormGroup({
            'idSucursal': new FormControl("0"),
            'bandera': new FormControl("0"),
            'nombre': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z 0-9ÑñáéíóúÁÉÍÓÚ]+$")]),
            'ubicacion': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z 0-9Ññáéíóú,ÁÉÍÓÚ#,.]+$")]),
            'correlativo': new FormControl("", [Validators.required, Validators.maxLength(5), Validators.pattern("^[a-zA-Z 0-9Ññ]+$")], this.noRepetirCorrelativo.bind(this))
        });
    }

    ngOnInit() {
        this.catalogoService.getSucursales().subscribe(res => { this.sucursales = res });
    }
    open() {
        //limpia cache
        this.titulo = "Formulario sucursal";
        this.sucursal.controls["idSucursal"].setValue("0");
        this.sucursal.controls["bandera"].setValue("0");
        this.sucursal.controls["nombre"].setValue("");
        this.sucursal.controls["ubicacion"].setValue("");
        this.sucursal.controls["correlativo"].setValue("");
        this.display = 'block';
    }
    close() {
        this.display = 'none';
        this.modif = 0;
        this.yaExiste = false;
    }
    open3() { //para modal de ayuda
        this.display3 = 'block';
    }
    close2() { //para modal de ayuda
        this.display3 = "none";
    }
    //Este metodo es el que puse en lugar de la promesa, porque daba error porque dependia de dos campos
    validar() {
        if (this.sucursal.controls["nombre"].value != "" && this.sucursal.controls["ubicacion"].value != "") {
            this.catalogoService.validarSucursalUbicacion(this.sucursal.controls["idSucursal"].value, this.sucursal.controls["nombre"].value, this.sucursal.controls["ubicacion"].value)
                .subscribe(data => {
                    if (data == 1) {
                        this.yaExiste = true;
                    } else {
                        this.yaExiste = false;
                    }
                });
        }
    }
    guardarDatos() {
        //Si la vandera es cero que es el que trae por defecto en el metodo open() entra en la primera a insertar
        if ((this.sucursal.controls["bandera"].value) == "0") {
            if (this.sucursal.valid == true) {
                this.catalogoService.setSucursal(this.sucursal.value).subscribe(data => {
                    if(data==1){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '¡Registro guardado con éxito!',
                            showConfirmButton: false,
                            timer: 3000
                        });
                        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Guardó una sucursal en el sistema.`).subscribe();
                        this.catalogoService.getSucursales().subscribe(res => { this.sucursales = res });
                    }else{
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: '¡Ocurrió un error al guardar el registro!',
                            showConfirmButton: false,
                            timer: 3000
                          });
                          this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó guardar una sucursal en el sistema.`).subscribe();
                    }
                });
            }
        } else {
            this.sucursal.controls["bandera"].setValue("0");
            if (this.sucursal.valid == true) {
                this.catalogoService.updateSucursal(this.sucursal.value).subscribe(data => {
                    if(data==1){
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '¡Registro modificado con éxito!',
                            showConfirmButton: false,
                            timer: 3000
                        });
                        this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Modificó una sucursal en el sistema.`).subscribe();
                        this.catalogoService.getSucursales().subscribe(res => { this.sucursales = res });
                    }else{
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: '¡Ocurrió un error al modificar el registro!',
                            showConfirmButton: false,
                            timer: 3000
                          });
                          this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó modificar una sucursal en el sistema.`).subscribe();
                    }
                });
            }
        }
        this.sucursal.controls["idSucursal"].setValue("0");
        this.sucursal.controls["bandera"].setValue("0");
        this.sucursal.controls["nombre"].setValue("");
        this.sucursal.controls["ubicacion"].setValue("");
        this.sucursal.controls["correlativo"].setValue("");
        this.display = 'none';
        this.modif = 0;
    }
    eliminar(idSucursal) {
        this.catalogoService.validarDependeArea(idSucursal).subscribe(data => {
            if (data == 1) {
                Swal.fire({
                    icon: 'error',
                    title: '¡ERROR!',
                    text: 'No es posible eliminar este registro, esta sucursal ya tiene áreas de negocio asignadas',
                    confirmButtonText: 'Aceptar'
                });
                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó eliminar una sucursal en el sistema.`).subscribe();
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
                        this.catalogoService.deleteSucursal(idSucursal).subscribe(data => {
                            if(data==1){
                                Swal.fire({
                                    icon: 'success',
                                    title: '¡ELIMINADO!',
                                    text: '¡El registro ha sido eliminado con éxito!',
                                    confirmButtonText: 'Aceptar'
                                });
                                this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Eliminó una sucursal en el sistema.`).subscribe();
                                this.catalogoService.getSucursales().subscribe(res => { this.sucursales = res });
                            }else{
                                Swal.fire({
                                    icon: 'error',
                                    title: '¡Error!',
                                    text: '¡Ocurrió un error al eliminar el registro!',
                                    confirmButtonText: 'Aceptar'
                                  });
                                  this.usuarioService.BitacoraTransaccion(parseInt(sessionStorage.getItem("idUser")), `Intentó eliminar una sucursal en el sistema.`).subscribe();
                            }
                        });
                    }
                })
            }
        })
    }
    modificar(id) {
        this.catalogoService.validarDepenActivo(id).subscribe(data => {
            if (data == 1) {
                this.modif = 1;
            }
            this.titulo = "Modificar sucursal";
            this.display = 'block';
            this.catalogoService.recuperarSucursal(id).subscribe(data => {
            this.sucursal.controls["idSucursal"].setValue(data.idSucursal);
            this.sucursal.controls["nombre"].setValue(data.nombre);
            this.sucursal.controls["ubicacion"].setValue(data.ubicacion);
            this.sucursal.controls["correlativo"].setValue(data.correlativo);
            this.sucursal.controls["bandera"].setValue("1");
            });
      });
    }
    buscar(buscador) {
        this.p = 1;
        this.catalogoService.buscarSucursal(buscador.value).subscribe(res => this.sucursales = res);
    }
    noRepetirCorrelativo(control: FormControl) {

        var promesa = new Promise((resolve, reject) => {

            if (control.value != "" && control.value != null) {

                this.catalogoService.validarCorrelativoSucursal(this.sucursal.controls["idSucursal"].value, control.value)
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
}
