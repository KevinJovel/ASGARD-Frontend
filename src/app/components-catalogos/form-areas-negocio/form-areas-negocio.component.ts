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
  p: number=1;
  sucursales: any;
  area: FormGroup;
  display = 'none';
  titulo: string;
  constructor(private catalogosServices: CatalogosService) { 
    this.area=new FormGroup({
      'idAreaNegocio': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl("",[Validators.required,Validators.maxLength(50)]),
      'idSucursal': new FormControl("0"),
      'correlativo': new FormControl("", [Validators.required, Validators.maxLength(10)], this.noRepetirCorrelativo.bind(this))
    });
  }

  ngOnInit() {
    this.catalogosServices.getAreas().subscribe(data=>{this.areas=data});
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursales=data});
  }
  open(){
    this.titulo= "Formulario Áreas de Negocio"
    this.display ='block';
    this.area.controls["idAreaNegocio"].setValue("0");
    this.area.controls["bandera"].setValue("0");
    this.area.controls["nombre"].setValue("");
    this.area.controls["idSucursal"].setValue("");
    this.area.controls["correlativo"].setValue("");
    this.display ='block';

  }
  close(){
    this.display ="none";
  }
  guardarDatos(){
    if ((this.area.controls["bandera"].value) == "0") {
      if (this.area.valid == true) {
        this.catalogosServices.setArea(this.area.value).subscribe(data => {
          this.catalogosServices.getAreas().subscribe(res => {this.areas = res});
         });
       
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro Guardado con exito',
          showConfirmButton: false,
          timer: 3000
        })
      }
    }else{

      this.area.controls["bandera"].setValue("0");
      if (this.area.valid == true) {
          this.catalogosServices.updateArea(this.area.value).subscribe(data => {
              this.catalogosServices.getAreas().subscribe(res => {this.areas = res});
           });
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Dato Modificado con exito',
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
    this.display ='none';
  }
  modificar(id){
    this.titulo = "Modificar Área de Negocio";
    this.display = 'block';
    this.catalogosServices.RecuperarArea(id).subscribe(data => {
        this.area.controls["idAreaNegocio"].setValue(data.idAreaNegocio);
        this.area.controls["nombre"].setValue(data.nombre);
        this.area.controls["idSucursal"].setValue(data.idSucursal);
        this.area.controls["correlativo"].setValue(data.correlativo);
        this.area.controls["bandera"].setValue("1");
        
    });

 
  }
  eliminar(idArea){

    this.catalogosServices.existenEmpleadosAsignados(idArea).subscribe(data=>{
      if(data==1){
       Swal.fire({
           icon: 'error',
           title: 'ERROR',
           text: 'No es posible eliminar este dato, esta área de negocio ya tiene empleados asignados',
         
         })    
      }else{
      Swal.fire({
      title: '¿Estas seguro de eliminar este registro?',
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
  }).then((result) => {
      if (result.value) {
          this.catalogosServices.DeleteArea(idArea).subscribe(data => {
              Swal.fire(
                  'Dato eliminado!',
                  'Tu archivo ha sido eliminado con exito.',
                  'success'
              )
              this.catalogosServices.getAreas().subscribe(res => {this.areas = res});
            });

          }
      })
         }
      })
      
  }
  buscar(buscador){
    this.p=1;
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
