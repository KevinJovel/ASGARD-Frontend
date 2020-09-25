import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  titulo: string;
  //parametro: string;
  p: number = 1;
  constructor(private catalogoService: CatalogosService, private router: Router,
    private activateRoute: ActivatedRoute) {

    this.proveedores = new FormGroup({

      'idProveedor': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ]+$")],this.noRepetirProveedor.bind(this)),
      'telefono': new FormControl("", [Validators.required, Validators.maxLength(10)],this.noRepetirTelProveedor.bind(this)),
      'direccion': new FormControl("", [Validators.required, Validators.maxLength(100), Validators.pattern("^[a-z A-Z 0-9 ñÑáÁéÉíÍóÓúÚ #.°]+$")]),
      'rubro': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z A-Z  ñÑáÁéÉíÍóÓúÚ]+$")]),
      'encargado': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-z A-Z ñÑáÁéÉíÍóÓúÚ]+$")],this.noRepetirEncargado.bind(this)),
      'telefonoencargado': new FormControl("", [Validators.required, Validators.maxLength(10)],this.noRepetirTelEncargado.bind(this))
    });

  }

  ngOnInit() {
    this.catalogoService.getProveedores().subscribe(res => { this.proveedor = res });
  }

  open() {
    //limpia cache
    this.titulo = "Formulario registro de proveedores";
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

  //dato() {
  //  Swal.fire('Any fool can use a computer')
  //}

  guardarDatos() {
    if ((this.proveedores.controls["bandera"].value) == "0") {
      if (this.proveedores.valid == true) {
        this.catalogoService.agregarProveedor(this.proveedores.value).subscribe(data => {
          this.catalogoService.getProveedores().subscribe(res => { this.proveedor = res });
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro guardado con éxito',
          showConfirmButton: false,
          timer: 3000
        })
      }
    }
    else {
      //Sino es porque la bandera trae otro valor y solo es posible cuando preciona el boton de recuperar

      this.proveedores.controls["bandera"].setValue("0");
      if (this.proveedores.valid == true) {
        this.catalogoService.ActualizarProveedor(this.proveedores.value).subscribe(data => {
          this.catalogoService.getProveedores().subscribe(res => { this.proveedor = res });
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro modificado con éxito',
          showConfirmButton: false,
          timer: 3000
        })
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
    this.catalogoService.getProveedores().subscribe(res => { this.proveedor = res });


    //this.router.navigate(["/form-proveedor"])
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
    this.catalogoService.validarDependeActivo(idProveedor).subscribe(data=>{
      if(data==1){
       Swal.fire({
           icon: 'error',
           title: 'ERROR',
           text: 'No es posible eliminar este dato, este proveedor ya tiene activos registrados',
           confirmButtonText: 'Aceptar'
         
         })    
      }else{
    Swal.fire({
      title: '¿Estás seguro de eliminar este registro?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText:'Cancelar',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.catalogoService.eliminarProveedor(idProveedor).subscribe(data => {
          Swal.fire({
              icon: 'success',
              title: '¡ELIMINADO!',
              text: 'El registro ha sido eliminado con éxito.',
              confirmButtonText: 'Aceptar'
          })
          this.catalogoService.getProveedores().subscribe(data => { this.proveedor = data });
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
        
          this.catalogoService.validarProveedor(this.proveedores.controls["idProveedor"].value,control.value)
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
        
          this.catalogoService.validarEncargado(this.proveedores.controls["idProveedor"].value,control.value)
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
        
          this.catalogoService.validarTelProveedor(this.proveedores.controls["telefono"].value,control.value)
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
        
          this.catalogoService.validarTelEncargado(this.proveedores.controls["idProveedor"].value,control.value)
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
  
//validar formularios que permita solo letras
  //public inputValidator(event: any) {
        ////console.log(event.target.value);
   // const pattern = /^[a-z A-Z]*$/;   
        ////let inputChar = String.fromCharCode(event.charCode)
   // if (!pattern.test(event.target.value)) {
  // event.target.value = event.target.value.replace(/[^a-z A-Z]/g, "");
        //// invalid character, prevent input
// en el input (input)="inputValidator($event)"
   // }
 // }


}

