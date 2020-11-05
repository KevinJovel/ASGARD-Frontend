import { Component, OnInit, ViewChild } from '@angular/core';
import { CatalogosService } from './../../services/catalogos.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form-areas-negocio',
  templateUrl: './form-areas-negocio.component.html',
  styleUrls: ['./form-areas-negocio.component.css']
})
export class FormAreasNegocioComponent implements OnInit {
  areas: any;
  p: number = 1;
  sucursales: any;
  area: FormGroup;
  display = 'none';
  display2 = 'none';
  display3 = 'none';
  titulo: string;
  yaExiste:boolean=false;
  modif: number=0;
  constructor(private catalogosServices: CatalogosService) {
    this.area = new FormGroup({
      'idAreaNegocio': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("", [Validators.required, Validators.maxLength(50), Validators.pattern("^[a-zA-Z 0-9ÑñáéíóúÁÉÍÓÚ]+$")]),
      'idSucursal': new FormControl("0",[Validators.required]),
      'correlativo': new FormControl("", [Validators.required, Validators.maxLength(10), Validators.pattern("^[a-zA-Z 0-9]+$")], this.noRepetirCorrelativo.bind(this))
    });
  }

  ngOnInit() {
    this.catalogosServices.getAreas().subscribe(data => { this.areas = data });
    this.catalogosServices.getComboSucursal().subscribe(data => { this.sucursales = data });
  }
  open() {
    this.titulo = "Formulario áreas de negocio"
    this.area.controls["idAreaNegocio"].setValue("0");
    this.area.controls["bandera"].setValue("0");
    this.area.controls["nombre"].setValue("");
    this.area.controls["idSucursal"].setValue("");
    this.area.controls["correlativo"].setValue("");
    this.display = 'block';

  }
  open2() {
    
    this.display2 = 'block';
  }
  open3() {
    
    this.display3 = 'block';
  }
  close() {
    this.display = "none";
    this.yaExiste=false;
    this.modif = 0;
  }
  close2() {
    this.display3 = "none";

  }
  validar(){
   if(this.area.controls["nombre"].value!=""&&this.area.controls["idSucursal"].value!=0){
    this.catalogosServices.validarAreaSucursal(this.area.controls["idAreaNegocio"].value,this.area.controls["nombre"].value,this.area.controls["idSucursal"].value)
    .subscribe(data => {
      if (data == 1) {
        this.yaExiste=true;
      } else {
        this.yaExiste=false;
      }

    });
   }
   
  }
  guardarDatos() {
    if ((this.area.controls["bandera"].value) == "0") {
      if (this.area.valid == true) {
        this.catalogosServices.setArea(this.area.value).subscribe(data => {
          this.catalogosServices.getAreas().subscribe(res => { this.areas = res });
        });

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro Guardado con éxito!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    } else {

      this.area.controls["bandera"].setValue("0");
      if (this.area.valid == true) {
        this.catalogosServices.updateArea(this.area.value).subscribe(data => {
          this.catalogosServices.getAreas().subscribe(res => { this.areas = res });
        });
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '¡Registro modificado con éxito!',
          showConfirmButton: false,
          timer: 3000
        })
      }
    }
    this.area.controls["idAreaNegocio"].setValue("0");
    this.area.controls["bandera"].setValue("0");
    this.area.controls["nombre"].setValue("");
    this.area.controls["idSucursal"].setValue("");
    this.area.controls["correlativo"].setValue("");
    this.display = 'none';
    this.modif = 0;
  }
  modificar(id) {
    this.catalogosServices.ValidarActivosReferenciadosArea(id).subscribe(data => {
      if (data == 1) {
          this.modif = 1;
      }
    this.titulo = "Modificar área de negocio";
    this.display = 'block';
    this.catalogosServices.RecuperarArea(id).subscribe(data => {
      this.area.controls["idAreaNegocio"].setValue(data.idAreaNegocio);
      this.area.controls["nombre"].setValue(data.nombre);
      this.area.controls["idSucursal"].setValue(data.idSucursal);
      this.area.controls["correlativo"].setValue(data.correlativo);
      this.area.controls["bandera"].setValue("1");

    });
  });

  }
  eliminar(idArea) {

    this.catalogosServices.existenEmpleadosAsignados(idArea).subscribe(data => {
      if (data == 1) {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'No es posible eliminar este registro, esta área de negocio ya tiene empleados asignados',
          confirmButtonText: 'Aceptar'
        })
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
            this.catalogosServices.DeleteArea(idArea).subscribe(data => {
              Swal.fire({
                icon: 'success',
                title: '¡ELIMINADO!',
                text: '¡El registro ha sido eliminado con éxito!',
                confirmButtonText: 'Aceptar'

            })
              this.catalogosServices.getAreas().subscribe(res => { this.areas = res });
            });

          }
        })
      }
    })

  }
  buscar(buscador) {
    this.p = 1;
    this.catalogosServices.buscarArea(buscador.value).subscribe(res => this.areas = res);
  }
  noRepetirCorrelativo(control: FormControl) {

    var promesa = new Promise((resolve, reject) => {

      if (control.value != "" && control.value != null) {

        this.catalogosServices.validarCorrelativoArea(this.area.controls["idAreaNegocio"].value, control.value)
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
