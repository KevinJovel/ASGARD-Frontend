import { Component, OnInit } from '@angular/core';
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
      'idArea': new FormControl("0"),
      'bandera': new FormControl("0"),
      'nombre': new FormControl(""),
      'idSucursal': new FormControl(""),
      'correlativo': new FormControl("")
    });
  }

  ngOnInit() {
    this.catalogosServices.getAreas().subscribe(data=>{this.areas=data});
    this.catalogosServices.getComboSucursal().subscribe(data=>{this.sucursales=data});
  }
  open(){
    this.titulo= "Formulario Áreas de Negocio"
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
    }
  }
  modificar(id){


 
  }
  eliminar(idArea){

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
  buscar(buscador){
    this.p=1;
    this.catalogosServices.buscarArea(buscador.value).subscribe(res => this.areas = res);
  }

}
